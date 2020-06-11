const auth = require('../middleware/auth');
const diffHistory = require('mongoose-diff-history/diffHistory');

// import models
const Ticket = require('../models/Ticket');
const History = require('mongoose-diff-history/diffHistoryModel').model;

// @route    GET /history/:id
// @desc     Get history by Ticket id
// @access   Private
exports.getHistory = [
  auth,
  async (req, res) => {
    try {
      const history = await diffHistory.getDiffs('Ticket', req.params.id);
      // TO DO add ObjectID format error handling
      res.json(history);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];

// @route    GET /history/sprint/:id
// @desc     Get history by Ticket id
// @access   Private
exports.getHistoryBySprint = [
  auth,
  async (req, res) => {
    try {
      const tickets = await Ticket.find({ sprint: req.params.id });
      const ticketids = tickets.map((ticket) => ticket._id);
      const history = await History.find(
        { collectionId: { $in: ticketids }, 'diff.status': 'Done' },
        {
          collectionId: 1,
          createdAt: 1,
          'diff.status': 1,
          'diff.storyPoint': 1,
        }
      );

      const output = history.map((hist) => {
        let h = hist.toObject();
        const ticket = tickets.find((ticket) =>
          ticket._id.equals(hist.collectionId)
        );
        if (ticket) {
          h.storyPoint = ticket.storyPoint;
          h.name = ticket.name;
        }
        return h;
      });
      // TO DO add ObjectID format error handling
      res.json(output);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
