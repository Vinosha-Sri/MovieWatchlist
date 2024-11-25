const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movie'); // Imports the movie controller
const Movie = require('../models/movie'); // Imports the Movie model for getting the movies
/* Gets the home page: */
router.get('/', async (req, res) => {
  try {
    const MovieList = await Movie.find(); // Gets the movies from the database
    res.render('index', { title: 'Movie Watchlist', MovieList }); // Passese the MovieList to EJS
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Failed to load movies', error });
  }
});
/* Gets movie list page (list all movies): */
router.get('/movies', MovieController.DisplayMovieList);
/* Gets add movie page: */
router.get('/movies/add', MovieController.AddMovie);
/* Post process add movie form: */
router.post('/movies/add', MovieController.ProcessAddMovie);
/* Gets edit movie page: */
router.get('/movies/edit/:id', MovieController.EditMovie);
/* Posts process edit movie form: */
router.post('/movies/edit/:id', MovieController.ProcessEditMovie);
/* Gets delete movie: */
router.get('/movies/delete/:id', MovieController.DeleteMovie);
/* Gets public page to list all movies: */
router.get('/public', MovieController.listAllMovies);
module.exports = router;