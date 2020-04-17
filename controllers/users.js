const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// import User model
const User = require('../models/User');

// @route   POST /users
// @desc    Register user
// @access  Public
exports.registerUser = [
  // Validate input
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),

  // Sanitize input
  // TO DO

  // Process request
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Create user instance
      user = new User({
        name,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
];

// @route    PUT /users
// @desc     Edit user info by token
// @access   Private
exports.editUser = [
  auth,
  // Validate input
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),

  // Sanitize input
  // TO DO

  // Process request
  async (req, res, next) => {
    try {
      let user = req.body;
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await User.findByIdAndUpdate(req.user.id, user);

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    PUT /projects/:id
// @desc     Edit project by id
// @access   Private
exports.editProject = [
  auth,
  async (req, res) => {
    try {
      let project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body.project
      );
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    DELETE /users
// @desc     Delete user by token
// @access   Private
exports.removeUser = [
  auth,
  // Process request
  async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.json({ msg: 'User successfully deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
