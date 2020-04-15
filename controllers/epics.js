const auth = require('../middleware/auth');

// import models
// const User = require('../models/User');
const Epic = require('../models/Epic');

// @route    GET /epics
// @desc     Get all epics
// @access   Private
exports.findEpics = [
  auth,
  async (req, res) => {
    try {
      const epic = await Epic.find();
      res.json(epic);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    GET /epics/:id
// @desc     Get epic by id
// @access   Private
exports.findEpic = [
  auth,
  async (req, res) => {
    try {
      const epic = await Epic.findById(req.params.id);
      // TO DO add ObjectID format error handling
      res.json(epic);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    POST /epics
// @desc     Create new epic
// @access   Private
exports.addEpic = [
  auth,
  async (req, res) => {
    try {
      // Create epic instance
      let epic = new Epic(req.body);

      await epic.save();
      res.json(epic);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    PUT /epics/:id
// @desc     Edit epic by id
// @access   Private
exports.editEpic = [
  auth,
  async (req, res) => {
    try {
      let epic = await Epic.findByIdAndUpdate(req.params.id, req.body);
      res.json(epic);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    DELETE /epics/:id
// @desc     Delete epic by id
// @access   Private
exports.removeEpic = [
  auth,
  // Process request
  async (req, res, next) => {
    try {
      await Epic.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Epic successfully deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
