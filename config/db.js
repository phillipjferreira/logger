const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
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
  connDemo.once('open', function () {
    console.log('MongoDB Demo Connected!!');
  });

  return [conn, connDemo];
};

module.exports = connectDB;
