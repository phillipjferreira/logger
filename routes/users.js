const express = require('express');
const router = express.Router();
const {
  registerUser,
  editUser,
  removeUser,
  editUserRole,
} = require('../controllers/users');

router.route('/').post(registerUser).put(editUser).delete(removeUser);

router.route('/:id').put(editUserRole);

module.exports = router;
