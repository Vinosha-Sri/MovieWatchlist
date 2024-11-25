const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movie'); // Import the movie controller
const Movie = require('../models/movie'); // Import the Movie model for fetching movies

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const MovieList = await Movie.find(); // Fetch movies from the database
    res.render('index', { title: 'Movie Watchlist', MovieList }); // Pass MovieList to EJS
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Failed to load movies', error });
  }
});

/* GET movie list page (list all movies). */
router.get('/movies', MovieController.DisplayMovieList);

/* GET add movie page. */
router.get('/movies/add', MovieController.AddMovie);

/* POST process add movie form. */
router.post('/movies/add', MovieController.ProcessAddMovie);

/* GET edit movie page. */
router.get('/movies/edit/:id', MovieController.EditMovie);

/* POST process edit movie form. */
router.post('/movies/edit/:id', MovieController.ProcessEditMovie);

/* GET delete movie. */
router.get('/movies/delete/:id', MovieController.DeleteMovie);

/* GET public page to list all movies. */
router.get('/public', MovieController.listAllMovies);

module.exports = router;
