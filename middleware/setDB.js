const config = require('config');

// import models
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Sprint = require('../models/Sprint');
const Project = require('../models/Project');
const History = require('mongoose-diff-history/diffHistoryModel').model;

// import plugin
// const diffHistory = require('mongoose-diff-history/diffHistory');

module.exports = async function (req, res, next) {
  const demo =
    (req.user && req.user.demo) || req.body.demo ? 'demo' : 'bug-tracker-v1';
  try {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(demo);
    res.locals.User = await db.model('User');
    res.locals.Ticket = await db.model('Ticket');
    res.locals.Sprint = await db.model('Sprint');
    res.locals.Project = await db.model('Project');
    res.locals.History = await db.model('History');
    next();
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
