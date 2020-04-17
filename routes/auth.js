const express = require('express');
const router = express.Router();
const { loginUser, authUser } = require('../controllers/auth');

router.route('/').get(authUser).post(loginUser);

module.exports = router;
