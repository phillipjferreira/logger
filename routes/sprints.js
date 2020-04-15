const express = require('express');
const router = express.Router();
const {
  findSprints,
  findSprint,
  addSprint,
  editSprint,
  removeSprint,
} = require('../controllers/sprints');

router.route('/').get(findSprints).post(addSprint);

router.route('/:id').get(findSprint).put(editSprint).delete(removeSprint);

module.exports = router;
