let mongoose = require('mongoose');

// Create a Movie model schema
let movieSchema = mongoose.Schema(
  {
    title: String, // Movie title
    genre: String, // Movie genre (e.g., Sci-Fi, Drama)
    year: Number, // Release year of the movie
    status: String, // Status (e.g., Watched, Not Watched)
  },
  {
    collection: "movies", // Specify the MongoDB collection name
  }
);

// Export the Movie model
module.exports = mongoose.model('Movie', movieSchema);
