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
  const connDemo = mongoose.createConnection(config.mongoDemoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  connDemo.on(
    'error',
    console.error.bind(console, 'MongoDB Demo Connection Error>> : ')
  );
  connDemo.once('open', function () {
    console.log('MongoDB Demo Connected!!');
  });

  return [conn, connDemo];
};

module.exports = connectDB;
