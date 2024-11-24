let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Initialize the app
let app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views')); // Set views folder
app.set('view engine', 'ejs'); // Use EJS as the templating engine

// Middleware setup
app.use(logger('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// MongoDB connection setup
let mongoDB = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('MongoDB is connected successfully');
});

// Routes setup
let indexRouter = require('./routes/index');
let moviesRouter = require('./routes/movies');

app.use('/', indexRouter); // Main route (homepage)
app.use('/movies', moviesRouter); // Route for movie-related actions

// Catch 404 errors and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
