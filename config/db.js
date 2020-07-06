const mongoose = require('mongoose');

// Cron Job
const cron = require('node-cron');
// Schema imports
const UserSchema = require('../schemas/User');
const TicketDemoSchema = require('../schemas/TicketDemo');
const SprintSchema = require('../schemas/Sprint');
const ProjectSchema = require('../schemas/Project');
const HistorySchema = require('../schemas/History');
// Seed Data imports
const userData = require('../config/demo_dump/users');
const projectData = require('../config/demo_dump/projects');
const sprintData = require('../config/demo_dump/sprints');
const ticketData = require('../config/demo_dump/tickets');
const historyData = require('../config/demo_dump/histories');

const connectDB = () => {
  // Connect Logger DB
  const conn = mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  conn.on('error', console.error.bind(console, 'MongoDB Connection Error : '));
  conn.once('open', function () {
    console.log('MongoDB Connected!!');
  });
  // Connect Demo DB
  const connDemo = mongoose.createConnection(process.env.MONGO_DEMO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  connDemo.on(
    'error',
    console.error.bind(console, 'MongoDB Demo Connection Error : ')
  );

  // Cron Job
  cron.schedule('0 2 * * *', async () => {
    // Drop Demo DB
    await connDemo.dropDatabase();

    // Seed connDemo DB
    const User = await connDemo.model('User', UserSchema);
    const Project = await connDemo.model('Project', ProjectSchema);
    const Sprint = await connDemo.model('Sprint', SprintSchema);
    const Ticket = await connDemo.model('Ticket', TicketDemoSchema);
    const History = await connDemo.model('History', HistorySchema);

    await User.insertMany(userData);
    await Project.insertMany(projectData);
    await Sprint.insertMany(sprintData);
    await Ticket.insertMany(ticketData);
    await History.insertMany(historyData);

    // Close connection for cron job
    await mongoose.connection.close();

    console.log('cron finished');
  });

  connDemo.once('open', function () {
    console.log('MongoDB Demo Connected!!');
  });

  return [conn, connDemo];
};

module.exports = connectDB;
