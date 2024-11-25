let mongoose = require('mongoose');
// Movie Model Schema:
let movieSchema = mongoose.Schema(
  {
    title: String, 
    genre: String, 
    year: Number,
    status: String, 
  },
  {
    collection: "movies", 
  }
);
// Exports the Movie model:
module.exports = mongoose.model('Movie', movieSchema);
