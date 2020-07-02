const bcrypt = require('bcryptjs');
// const auth = require('../middleware/auth');
const authLevel = require('../middleware/authLevel');
const setDB = require('../middleware/setDB');
const jwt = require('jsonwebtoken');
// const { check, validationResult } = require('express-validator');

// @route    GET /roles
// @desc     Get all users and roles
// @access   Private
exports.getRoles = [
  authLevel(1),
  setDB,
  async (req, res) => {
    try {
      let user = await res.locals.User.find().select('-password');
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
  setDB,
  async (req, res) => {
    try {
      let user = await res.locals.User.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
