const auth = require('../middleware/auth');

// import models
// const User = require('../models/User');
const Ticket = require('../models/Ticket');

// @route    GET /tickets
// @desc     Get all tickets
// @access   Private
exports.findTickets = [
  auth,
  async (req, res) => {
    try {
      const ticket = await Ticket.find();
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
  async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      // TO DO add ObjectID format error handling
      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    GET /tickets/project/:id
// @desc     Get ticket by projectid
// @access   Private
exports.findTicketProject = [
  auth,
  async (req, res) => {
    try {
      const ticket = await Ticket.find({ project: req.params.id });
      // TO DO add ObjectID format error handling
      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    GET /tickets/sprint/:id
// @desc     Get ticket by sprintid
// @access   Private
exports.findTicketSprint = [
  auth,
  async (req, res) => {
    try {
      const ticket = await Ticket.find({ sprint: req.params.id });
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
  async (req, res) => {
    try {
      // Create epic instance
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
  async (req, res) => {
    try {
      let ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body);
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
  // Process request
  async (req, res, next) => {
    try {
      await Ticket.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Ticket successfully deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
