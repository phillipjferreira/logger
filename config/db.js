const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     });
//     console.log('MongoDB Connected...');
//   } catch (err) {
//     console.error(err.message);
//     //Exit process with failure
//     process.exit(1);
//   }
// };

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
  require('../models/Ticket');
  require('../models/Sprint');
  require('../models/Project');
  return conn;
};

module.exports = connectDB;
