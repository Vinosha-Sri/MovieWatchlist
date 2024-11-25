const mongoose = require('mongoose');
const Movie = require('./models/movie'); // Adjusts the path to your Movie model.
// Connects to MongoDB:
mongoose.connect('mongodb+srv://Vinosha-Sri:ABCDEFGHI@cluster0.pb9yg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const seedMovies = async () => {
  try {
    await Movie.insertMany([
      { title: 'Inside Out', genre: 'Comedy', year: 2015, status: 'Watched' },
      { title: 'It Ends With Us', genre: 'Romance', year: 2024, status: 'Watched' },
      { title: 'Fault in Our Stars', genre: 'Romance', year: 2014, status: 'Unwatched' },
    ]);
    console.log('Movies added successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding movies:', error);
    mongoose.connection.close();
  }
};
seedMovies();