const express = require('express');
const router = express.Router();
const {
  findProjects,
  findProject,
  addProject,
  editProject,
  removeProject,
} = require('../controllers/projects');

router.route('/').get(findProjects).post(addProject);

router.route('/:id').get(findProject).put(editProject).delete(removeProject);

module.exports = router;
