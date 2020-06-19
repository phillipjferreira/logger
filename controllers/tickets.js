const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const setDB = require('../middleware/setDB');

// @route    GET /tickets
// @desc     Get all tickets
// @access   Private
exports.findTickets = [
  auth,
  setDB,
  async (req, res) => {
    try {
      const ticket = await res.locals.Ticket.find();
      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    GET /tickets/:id
// @desc     Get ticket by id
// @access   Private
exports.findTicket = [
  auth,
  setDB,
  async (req, res) => {
    try {
      const ticket = await res.locals.Ticket.findById(req.params.id);
      // TO DO add ObjectID format error handling
      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    GET /tickets/project/:id
// @desc     Get tickets by projectid
// @access   Private
exports.findTicketProject = [
  auth,
  setDB,
  async (req, res) => {
    try {
      const ticket = await res.locals.Ticket.find({ project: req.params.id });
      // TO DO add ObjectID format error handling
      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    GET /tickets/sprint/:id
// @desc     Get tickets by sprintid
// @access   Private
exports.findTicketSprint = [
  auth,
  setDB,
  async (req, res) => {
    try {
      const ticket = await res.locals.Ticket.find({ sprint: req.params.id });
      // TO DO add ObjectID format error handling
      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    POST /tickets
// @desc     Create new ticket
// @access   Private
exports.addTicket = [
  auth,
  setDB,
  async (req, res) => {
    try {
      // Create epic instance
      const Ticket = await res.locals.Ticket;
      let ticket = new Ticket(req.body);

      await ticket.save();
      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    PUT /tickets/:id
// @desc     Edit ticket by id
// @access   Private
exports.editTicket = [
  auth,
  setDB,
  async (req, res) => {
    try {
      let ticket = await res.locals.Ticket.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          __user: mongoose.Types.ObjectId(req.user.id),
        }
      );
      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    DELETE /tickets/:id
// @desc     Delete ticket by id
// @access   Private
exports.removeTicket = [
  auth,
  setDB,
  // Process request
  async (req, res, next) => {
    try {
      await res.locals.Ticket.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Ticket successfully deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
