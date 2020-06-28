const auth = require('../middleware/auth');
const authLevel = require('../middleware/authLevel');
const setDB = require('../middleware/setDB');

// const { check, validationResult } = require('express-validator');

// @route    GET /projects
// @desc     Get all projects
// @access   Private
exports.findProjects = [
  authLevel(1),
  setDB,
  async (req, res) => {
    try {
      const project = await res.locals.Project.find();
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
  authLevel(1),
  setDB,
  async (req, res) => {
    try {
      const project = await res.locals.Project.findById(req.params.id).populate(
        'lead',
        'name'
      );
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
  authLevel(3),
  setDB,
  async (req, res) => {
    try {
      // Create project instance
      const Project = await res.locals.Project;
      let project = new Project(req.body);

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
  authLevel(3),
  setDB,
  async (req, res) => {
    try {
      let project = await res.locals.Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
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
  authLevel(3),
  setDB,
  // Process request
  async (req, res, next) => {
    try {
      await res.locals.Project.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Project successfully deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
