const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const HttpError = require('../util/http-error');
const User = require('../model/user-model');

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid input passed, please check your data', 422)
    );
  }

  const { lastname, firstname, email, password, userType, isActivated } =
    req.body;

  let existingUser;

  /* On recherche un utilisateur avec email saisi */
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Signing up failed', 500));
  }

  /* Si on a déjà un email on retourne une erreur */
  if (existingUser) {
    return next(new HttpError('User exist already, login instead', 422));
  }

  /* Encodage du mot de passe */
  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  let createdUser = new User({
    lastname,
    firstname,
    email,
    password: hashedPassword,
    userType,
    isActivated,
  });

  try {
    await createdUser.save();
    res.status(201).send({ createdUser });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (e) {
    res.status(500).send();
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid, '-password');
    res.send({ user });
  } catch (e) {
    res.status(500).send();
  }
};

const updateUser = async (req, res) => {
  const _id = req.params.uid;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    '_id',
    'lastname',
    'firstname',
    'email',
    'userType',
    'isActivated',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  try {
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(404).send();
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send();
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.uid,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
};

exports.createUser = createUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
