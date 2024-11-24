var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Movie Watchlist' });
});

/*
MVC --> Model View Controller 
model --> Handles database interactions
view --> Renders pages
controller --> Contains logic behind routes
*/

/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('partials/Home', { title: 'Movie Watchlist - Home' });
});

/* GET about page. */
router.get('/about', function (req, res, next) {
  res.render('partials/About', { title: 'About Movie Watchlist' });
});

/* GET movie list page. */
router.get('/movies', function (req, res, next) {
  res.render('partials/Movies', { title: 'Movie List' });
});

/* GET add movie page. */
router.get('/movies/add', function (req, res, next) {
  res.render('partials/AddMovie', { title: 'Add a New Movie' });
});

/* GET contact page. */
router.get('/contact', function (req, res, next) {
  res.render('partials/Contact', { title: 'Contact Us' });
});

module.exports = router;
