// import models
const UserSchema = require('../schemas/User');
const TicketSchema = require('../schemas/Ticket');
const TicketDemoSchema = require('../schemas/TicketDemo');
const SprintSchema = require('../schemas/Sprint');
const ProjectSchema = require('../schemas/Project');
const HistorySchema = require('../schemas/History');

// import plugin
const diffHistory = require('../plugins/diffHistoryCustom');

module.exports = async function (req, res, next) {
  try {
    const version =
      (req.user && req.user.demo) || req.body.demo ? 'demo' : 'logger';

    let conn;

    if (version === 'logger') {
      conn = await global.clientConnection[0];
    } else {
      conn = await global.clientConnection[1];
    }

    const History = await conn.model('History', HistorySchema);
    let Ticket;

    if (version === 'logger') {
      TicketSchema.plugin(diffHistory.plugin, {
        omit: ['created', 'updated', 'assignedBy', 'project'],
        History: History,
      });
      Ticket = await conn.model('Ticket', TicketSchema);
    } else {
      TicketDemoSchema.plugin(diffHistory.plugin, {
        omit: ['created', 'updated', 'assignedBy', 'project'],
        History: History,
      });
      Ticket = await conn.model('Ticket', TicketDemoSchema);
    }

    res.locals.History = History;
    res.locals.Ticket = Ticket;
    res.locals.User = await conn.model('User', UserSchema);
    res.locals.Sprint = await conn.model('Sprint', SprintSchema);
    res.locals.Project = await conn.model('Project', ProjectSchema);
    next();
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
