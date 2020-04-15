const auth = require('../middleware/auth');
// const { check, validationResult } = require('express-validator');

// import models
// const User = require('../models/User');
const Project = require('../models/Project');

// @route    GET /projects
// @desc     Get all projects
// @access   Private
exports.findProjects = [
  auth,
  async (req, res) => {
    try {
      const project = await Project.find();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    GET /projects/:id
// @desc     Get project by id
// @access   Private
exports.findProject = [
  auth,
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      // TO DO add ObjectID format error handling
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    POST /projects
// @desc     Create new project
// @access   Private
exports.addProject = [
  auth,
  async (req, res) => {
    try {
      const { name, key, lead, description } = req.body;
      // Create project instance
      let project = new Project({
        name,
        key,
        lead,
        description,
      });

      await project.save();
      res.json(project);
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

// @route    DELETE /projects/:id
// @desc     Delete project by id
// @access   Private
exports.removeProject = [
  auth,
  // Process request
  async (req, res, next) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Project successfully deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
