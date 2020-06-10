const auth = require('../middleware/auth');
const diffHistory = require('mongoose-diff-history/diffHistory');
// import models

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
