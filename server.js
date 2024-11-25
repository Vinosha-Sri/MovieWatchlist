const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// Imports routes:
const indexRouter = require('./routes/index');
// Imports the MongoDB URI:
const dbConfig = require('./config/database');
// Initializes the Express App:
const app = express();
// MongoDB connection:
mongoose
  .connect(dbConfig.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.error('Connection Error:', err.message));
// Middleware:
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Views Engine Setup:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Utilizes the routes:
app.use('/', indexRouter);
// Error handling for 404:
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
// General error handling:
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});
// Starts the server:
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = app;
