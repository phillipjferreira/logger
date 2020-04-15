const express = require('express');
const router = express.Router();
const {
  findTickets,
  findTicket,
  addTicket,
  editTicket,
  removeTicket,
} = require('../controllers/tickets');

router.route('/').get(findTickets).post(addTicket);

router.route('/:id').get(findTicket).put(editTicket).delete(removeTicket);

module.exports = router;
