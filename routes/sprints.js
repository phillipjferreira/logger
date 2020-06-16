const express = require('express');
const router = express.Router();
const {
  findSprints,
  findSprintsById,
  addSprint,
  editSprint,
  removeSprint,
} = require('../controllers/sprints');

router.route('/').get(findSprints).post(addSprint);

router.route('/:id').get(findSprintsById).put(editSprint).delete(removeSprint);

module.exports = router;
