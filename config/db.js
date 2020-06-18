const mongoose = require('mongoose');
const config = require('config');

const connectDB = () => {
  const conn = mongoose.createConnection(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  conn.on(
    'error',
    console.error.bind(console, 'MongoDB Connection Error>> : ')
  );
  conn.once('open', function () {
    console.log('MongoDB Connected!!');
  });
  require('../models/User');
  require('../models/TicketDemo');
  require('../models/Ticket');
  require('../models/Sprint');
  require('../models/Project');
  return conn;
};

module.exports = connectDB;
