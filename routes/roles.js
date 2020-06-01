const express = require('express');
const router = express.Router();
const { getRoles, editRole } = require('../controllers/roles');

router.route('/').get(getRoles);
router.route('/:id').put(editRole);

module.exports = router;
