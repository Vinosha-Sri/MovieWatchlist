let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
require('dotenv').config();
// Initializes the app:
let app = express();
//Views folder:
app.set('views', path.join(__dirname, 'views')); 
//EJS:
app.set('view engine', 'ejs');
// Middleware:
//Used to log the HTTP requests:
app.use(logger('dev'));
//Parses the JSON data: 
app.use(express.json()); // Parse JSON data
//Parses the URL-encoded data:
app.use(express.urlencoded({ extended: false })); 
//Parses the cookies:
app.use(cookieParser());
//Static files:
app.use(express.static(path.join(__dirname, 'public'))); 
// MongoDB Connection:
let mongoDB = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('MongoDB Connected');
});
// Routes creation:
let indexRouter = require('./routes/index');
let moviesRouter = require('./routes/movies');
// Main Route to the Homepage:
app.use('/', indexRouter);
// Route for CRUD applications for MovieWatchlist:
app.use('/movies', moviesRouter);
// Finds 404 errors and sends it to the error handler:
app.use(function (req, res, next) {
  next(createError(404));
});
// Error handler:
app.use(function (err, req, res, next) {
  // Set locals and only provides error in development:
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Error page render:
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});
module.exports = app;