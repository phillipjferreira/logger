// import models
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const TicketDemo = require('../models/TicketDemo');
const Sprint = require('../models/Sprint');
const Project = require('../models/Project');
const History = require('mongoose-diff-history/diffHistoryModel').model;

module.exports = async function (req, res, next) {
  const version =
    (req.user && req.user.demo) || req.body.demo ? 'demo' : 'bug-tracker-v1';
  try {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(version);

    if (version === 'demo') {
      res.locals.Ticket = await db.model('TicketDemo');
    } else if (version === 'bug-tracker-v1') {
      res.locals.Ticket = await db.model('Ticket');
    }

    res.locals.User = await db.model('User');
    res.locals.Sprint = await db.model('Sprint');
    res.locals.Project = await db.model('Project');
    res.locals.History = await db.model('History');
    next();
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
