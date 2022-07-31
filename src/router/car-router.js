const { Router } = require('express');
const router = Router();
const {
  createCar,
  getCars,
  editCar,
  deleteCar,
} = require('../controller/car-controller');

router.post('/voitures/ajouter', createCar);
router.get('/voitures', getCars);
router.patch('/voitures/editer/:cid', editCar);
router.delete('/voitures/:cid', deleteCar);

module.exports = router;
