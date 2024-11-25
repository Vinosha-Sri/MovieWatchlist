const Movie = require('../models/movie'); // Movie model

// Display Movie List
module.exports.DisplayMovieList = async (req, res, next) => {
  try {
    const movieList = await Movie.find(); // Fetch all movies from the database
    res.render('movies/list', {
      title: 'Movie List',
      MovieList: movieList, // Pass the movies to the view
    });
  } catch (err) {
    console.error(err);
    res.render('error', {
      message: 'Error fetching movie list',
      error: err,
    });
  }
};

// Display Add Movie Page
module.exports.AddMovie = (req, res, next) => {
  res.render('movies/add', {
    title: 'Add Movie',
  });
};

// Process Adding a Movie
module.exports.ProcessAddMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year,
      status: req.body.status,
    });
    await Movie.create(newMovie); // Add the movie to the database
    res.redirect('/movies');
  } catch (err) {
    console.error(err);
    res.render('error', {
      message: 'Error adding movie',
      error: err,
    });
  }
};

// Display Edit Movie Page
module.exports.EditMovie = async (req, res, next) => {
  try {
    const id = req.params.id; // Get movie ID from the route
    const movieToEdit = await Movie.findById(id); // Find the movie by ID
    res.render('movies/edit', {
      title: 'Edit Movie',
      Movie: movieToEdit, // Pass the movie data to the view
    });
  } catch (err) {
    console.error(err);
    res.render('error', {
      message: 'Error fetching movie for edit',
      error: err,
    });
  }
};

// Process Editing a Movie
module.exports.ProcessEditMovie = async (req, res, next) => {
  try {
    const id = req.params.id; // Get movie ID from the route
    const updatedMovie = {
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year,
      status: req.body.status,
    };
    await Movie.findByIdAndUpdate(id, updatedMovie); // Update the movie in the database
    res.redirect('/movies');
  } catch (err) {
    console.error(err);
    res.render('error', {
      message: 'Error updating movie',
      error: err,
    });
  }
};

// Delete a Movie
module.exports.DeleteMovie = async (req, res, next) => {
  try {
    const id = req.params.id; // Get movie ID from the route
    await Movie.findByIdAndDelete(id); // Delete the movie from the database
    res.redirect('/movies');
  } catch (err) {
    console.error(err);
    res.render('error', {
      message: 'Error deleting movie',
      error: err,
    });
  }
};

// List All Movies for Public Page
module.exports.listAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from the collection
    res.render('publicMovies', { title: 'Public Movie List', movies }); // Render the 'publicMovies.ejs' view
  } catch (err) {
    console.error(err);
    res.render('error', {
      message: 'Error fetching public movies',
      error: err,
    });
  }
};
