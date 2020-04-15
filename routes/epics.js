const express = require('express');
const router = express.Router();
const {
  findEpics,
  findEpic,
  addEpic,
  editEpic,
  removeEpic,
} = require('../controllers/epics');

router.route('/').get(findEpics).post(addEpic);

router.route('/:id').get(findEpic).put(editEpic).delete(removeEpic);

module.exports = router;
