const User = require('../model/user-model');

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
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

const editUser = async (req, res) => {
  const _id = req.params.uid;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['lastname', 'firstname', 'email', 'isActivated'];
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
exports.editUser = editUser;
exports.deleteUser = deleteUser;
