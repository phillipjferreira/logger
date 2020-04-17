const express = require('express');
const router = express.Router();
const { registerUser, editUser, removeUser } = require('../controllers/users');

router.route('/').post(registerUser).put(editUser).delete(removeUser);

module.exports = router;
