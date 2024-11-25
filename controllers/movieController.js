const Movie = require('../models/movie'); // Your Mongoose model

module.exports.listAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from the collection
    res.render('publicMovies', { title: 'Public Movie List', movies });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching movies.');
  }
};
