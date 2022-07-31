const { Router } = require('express');
const router = Router();
const {
  createUser,
  getUsers,
  editUser,
  deleteUser,
} = require('../controller/user-controller');

router.post('/utilisateurs/ajouter', createUser);
router.get('/utilisateurs', getUsers);
router.patch('/utilisateurs/editer/:uid', editUser);
router.delete('/utilisateurs/:uid', deleteUser);

module.exports = router;
