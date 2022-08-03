const { Router } = require('express');
const router = Router();
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
} = require('../controller/car-controller');

router.post('/car', createCar);
router.get('/cars', getCars);
router.get('/car/:cid', getCar);
router.patch('/car/:cid', updateCar);
router.delete('/car/:cid', deleteCar);

module.exports = router;
