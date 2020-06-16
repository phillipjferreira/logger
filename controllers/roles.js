const bcrypt = require('bcryptjs');
// const auth = require('../middleware/auth');
const authLevel = require('../middleware/authLevel');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// import User model
const User = require('../models/User');

// @route    GET /roles
// @desc     Get all users and roles
// @access   Private
exports.getRoles = [
  authLevel(1),
  async (req, res) => {
    try {
      let user = await User.find().select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    PUT /roles/:id
// @desc     Edit roles by user id
// @access   Private
exports.editRole = [
  authLevel(3),
  async (req, res) => {
    try {
      let user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
