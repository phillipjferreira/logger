const express = require('express');
const router = express.Router();
const { findUser, loginUser } = require('../controllers/auth');

router.route('/').get(findUser).post(loginUser);

module.exports = router;
