const express = require('express');
const router = express.Router();
const {
  findTickets,
  findTicket,
  findTicketAndPopulate,
  addTicket,
  editTicket,
  removeTicket,
  findTicketProject,
  findTicketSprint,
} = require('../controllers/tickets');

router.route('/').get(findTickets).post(addTicket);

router.route('/:id').get(findTicket).put(editTicket).delete(removeTicket);

router.route('/populate/:id').get(findTicketAndPopulate);

router.route('/project/:id').get(findTicketProject);

router.route('/sprint/:id').get(findTicketSprint);

module.exports = router;
