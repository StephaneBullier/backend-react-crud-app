const { Router } = require('express');
const router = Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controller/user-controller');

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/user/:uid', getUserById);
router.patch('/user/:uid', updateUser);
router.delete('/users/:uid', deleteUser);

module.exports = router;
