const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const app = express(); // Initialize Express

// Middleware
app.use(expressLayouts); // Use express-ejs-layouts
app.use(express.static("public")); // Serve static files from 'public' folder
app.use(express.urlencoded({ extended: true })); // Parse form data

// Set View Engine
app.set("view engine", "ejs");
app.set("layout", "layout"); // Set default layout

// Database Connection
mongoose.connect("mongodb://localhost:27017/movie_watchlist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model
const Movie = mongoose.model("Movie", {
  title: String,
  genre: String,
  year: Number,
  status: String,
});

// Routes
app.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.render("index", { movies }); // Render 'index.ejs' content within 'layout.ejs'
});

app.get("/movies/new", (req, res) => {
  res.render("addmovie"); // Render 'addmovie.ejs'
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
