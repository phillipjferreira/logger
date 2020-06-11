const express = require('express');
const router = express.Router();
const { getHistory, getHistoryBySprint } = require('../controllers/history');

router.route('/:id').get(getHistory);

router.route('/sprint/:id').get(getHistoryBySprint);

module.exports = router;
