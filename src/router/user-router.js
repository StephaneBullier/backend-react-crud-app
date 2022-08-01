const { Router } = require('express');
const router = Router();
const {
  createUser,
  getUsers,
  editUser,
  deleteUser,
} = require('../controller/user-controller');

router.post('/users', createUser);
router.get('/users', getUsers);
router.patch('/users/:uid', editUser);
router.delete('/users/:uid', deleteUser);

module.exports = router;
