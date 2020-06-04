const auth = require('../middleware/auth');
// const { check, validationResult } = require('express-validator');

// import models
// const User = require('../models/User');
const Sprint = require('../models/Sprint');

// @route    GET /sprints/:id
// @desc     Get sprints by projectid
// @access   Private
exports.findSprints = [
  auth,
  async (req, res) => {
    try {
      const sprint = await Sprint.find({ project: req.params.id });
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
  async (req, res) => {
    try {
      // const { name, startDate, endDate, goal, project } = req.body;
      // Create sprint instance
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
  async (req, res) => {
    try {
      let sprint = await Sprint.findByIdAndUpdate(req.params.id, req.body);
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
  // Process request
  async (req, res, next) => {
    try {
      await Sprint.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Sprint successfully deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
