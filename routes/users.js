const express = require('express');
const router = express.Router();
const {
  findUser,
  registerUser,
  editUser,
  removeUser,
} = require('../controllers/users');

router
  .route('/')
  .get(findUser)
  .post(registerUser)
  .put(editUser)
  .delete(removeUser);

module.exports = router;
