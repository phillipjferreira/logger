const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const setDB = require('../middleware/setDB');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

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
  setDB,

  // Sanitize input
  // TO DO

  // Process request
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, demo } = req.body;

    try {
      // See if user exists
      let user = await res.locals.User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const User = await res.locals.User;
      // Create user instance
      user = new User({
        name,
        email,
        password,
        demo,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return JWT
      const payload = {
        user: {
          id: user._id,
          role: user.role,
          demo: user.demo,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
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
  setDB,
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

      await res.locals.User.findByIdAndUpdate(req.user.id, user);

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    PUT /users/:id
// @desc     Edit user info by id
// @access   Private
exports.editUserRole = [
  auth,
  setDB,
  // Process request
  async (req, res, next) => {
    try {
      let user = await res.locals.User.findByIdAndUpdate(req.params.id, {
        role: req.body.user.role,
      });

      res.json(user);
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
  setDB,
  // Process request
  async (req, res, next) => {
    try {
      await res.locals.User.findByIdAndDelete(req.user.id);
      res.json({ msg: 'User successfully deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
