const auth = require('../middleware/auth');
const setDB = require('../middleware/setDB');

// const { check, validationResult } = require('express-validator');

// @route    GET /sprints
// @desc     Get all sprints
// @access   Private
exports.findSprints = [
  auth,
  setDB,
  async (req, res) => {
    try {
      const sprint = await res.locals.Sprint.find();
      res.json(sprint);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    GET /sprints/:id
// @desc     Get sprints by projectid
// @access   Private
exports.findSprintsById = [
  auth,
  setDB,
  async (req, res) => {
    try {
      const sprint = await res.locals.Sprint.find({
        project: req.params.id,
      });
      // TO DO add ObjectID format error handling
      res.json(sprint);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    POST /sprints
// @desc     Create new sprint
// @access   Private
exports.addSprint = [
  auth,
  setDB,
  async (req, res) => {
    try {
      // const { name, startDate, endDate, goal, project } = req.body;
      // Create sprint instance
      const Sprint = await res.locals.Sprint;
      let sprint = new Sprint(req.body);

      await sprint.save();
      res.json(sprint);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    PUT /sprints/:id
// @desc     Edit sprint by id
// @access   Private
exports.editSprint = [
  auth,
  setDB,
  async (req, res) => {
    try {
      let sprint = await res.locals.Sprint.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.json(sprint);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    DELETE /sprints/:id
// @desc     Delete sprint by id
// @access   Private
exports.removeSprint = [
  auth,
  setDB,
  // Process request
  async (req, res, next) => {
    try {
      await res.locals.Sprint.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Sprint successfully deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
