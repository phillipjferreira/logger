const auth = require('../middleware/auth');
const authLevel = require('../middleware/authLevel');
const setDB = require('../middleware/setDB');

// @route    GET /history/:id
// @desc     Get history by Ticket id
// @access   Private
exports.getHistory = [
  authLevel(1),
  setDB,
  async (req, res) => {
    try {
      const history = await res.locals.History.find({
        collectionId: req.params.id,
      })
        .populate('diff.sprint', 'name')
        .populate('diff.assignedTo', 'name')
        .populate('user', 'name');

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
  authLevel(1),
  setDB,
  async (req, res) => {
    try {
      const sprint = await res.locals.Sprint.findById(req.params.id);
      const tickets = await res.locals.Ticket.find({ sprint: req.params.id });
      const ticketids = tickets.map((ticket) => ticket._id);
      const history = await res.locals.History.find(
        {
          collectionId: { $in: ticketids },
          'diff.status': 'Done',
          createdAt: { $gte: sprint.startDate, $lte: sprint.endDate },
        },
        {
          collectionId: 1,
          createdAt: 1,
          'diff.status': 1,
          'diff.storyPoint': 1,
        }
      ).sort({
        createdAt: 1,
      });

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
      res.json({ history: output, sprint: sprint });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
];
