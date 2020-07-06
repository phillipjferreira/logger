const express = require('express');
var sslRedirect = require('heroku-ssl-redirect');
const hsts = require('hsts');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Require dotenv if in dev
if (app.get('env') == 'development') {
  require('dotenv').config();
}

// Connect Database
global.clientConnection = connectDB();

// Enable ssl redirect
app.use(sslRedirect(['production'], 301));

// Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
const sixtyDaysInSeconds = 5184000;
app.use(
  hsts({
    maxAge: sixtyDaysInSeconds,
    preload: true,
  })
);

// Init Middleware
app.use(express.json({ extended: false }));

// Require Routers
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/roles', require('./routes/roles'));
app.use('/projects', require('./routes/projects'));
app.use('/sprints', require('./routes/sprints'));
app.use('/tickets', require('./routes/tickets'));
app.use('/history', require('./routes/history'));

// Production build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
