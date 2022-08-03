const Car = require('../model/car-model');

const createCar = async (req, res) => {
  const car = new Car(req.body);
  try {
    await car.save();
    res.status(201).send({ car });
  } catch (error) {
    res.status(400).send();
  }
};

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.send({ cars });
  } catch (e) {
    res.status(500).send();
  }
};

const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.cid);
    res.send({ car });
  } catch (e) {
    res.status(500).send();
  }
};

const updateCar = async (req, res) => {
  const _id = req.params.cid;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['_id', 'name', 'price', 'brand'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  try {
    const car = await Car.findOne({ _id });

    if (!car) {
      return res.status(404).send();
    }

    updates.forEach((update) => (car[update] = req.body[update]));
    await car.save();

    res.status(200).send(car);
  } catch (error) {
    res.status(500).send();
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({
      _id: req.params.cid,
    });

    if (!car) {
      return res.status(404).send();
    }

    res.send(car);
  } catch (e) {
    res.status(500).send();
  }
};

exports.createCar = createCar;
exports.getCars = getCars;
exports.getCar = getCar;
exports.updateCar = updateCar;
exports.deleteCar = deleteCar;
