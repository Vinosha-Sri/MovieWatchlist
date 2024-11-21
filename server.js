const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const Movie = require("./models/movie");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/movie_watchlist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.render("index", { movies });
});
app.get("/movies/new", (req, res) => {
  res.render("new");
});
app.post("/movies", async (req, res) => {
  await Movie.create(req.body.movie);
  res.redirect("/");
});
app.get("/movies/:id/edit", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("edit", { movie });
});
app.put("/movies/:id", async (req, res) => {
  await Movie.findByIdAndUpdate(req.params.id, req.body.movie);
  res.redirect("/");
});
app.delete("/movies/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
