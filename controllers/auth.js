const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const setDB = require('../middleware/setDB');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// @route    GET /auth
// @desc     Authenticate user by token
// @access   Private
exports.authUser = [
  auth,
  setDB,
  async (req, res) => {
    try {
      const user = await res.locals.User.findById(req.user.id).select(
        '-password'
      );
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route   POST /auth
// @desc    Login - Authenticate User and get token
// @access  Public
exports.loginUser = [
  // Validate input
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  setDB,
  // Sanitize input
  // TO DO

  // Process request
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await res.locals.User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
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
