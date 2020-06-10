const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Require Routers
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/roles', require('./routes/roles'));
app.use('/projects', require('./routes/projects'));
app.use('/sprints', require('./routes/sprints'));
app.use('/epics', require('./routes/epics'));
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
