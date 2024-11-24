const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

// Debugging: Log the MongoDB URI to verify it is being loaded correctly
console.log("MongoDB URI:", process.env.MONGODB_URI);

const connectDB = require("./config/database"); 
const app = express(); 

// Middleware
app.use(expressLayouts); 
app.use(express.static("public")); 
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set("view engine", "ejs");
app.set("layout", "layout"); 

// Connect to MongoDB
connectDB();

// Define the Movie model
const Movie = mongoose.model("Movie", {
  title: String,
  genre: String,
  year: Number,
  status: String,
});

// Insert a sample movie
const createSampleMovie = async () => {
  try {
    const sampleMovie = new Movie({
      title: "Inception",
      genre: "Sci-Fi",
      year: 2010,
      status: "Watched",
    });
    await sampleMovie.save();
    console.log("Sample movie added to the database!");
  } catch (err) {
    console.error("Error adding sample movie:", err.message);
  }
};

// Call the function to insert a sample movie
createSampleMovie();

// Routes
app.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.render("index", { movies }); // Render 'index.ejs' content within 'layout.ejs'
});

app.get("/movies/new", (req, res) => {
  res.render("addmovie"); // Render 'addmovie.ejs'
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
