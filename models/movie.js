const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  year: Number,
  status: { type: String, default: "Unwatched" },
});
module.exports = mongoose.model("Movie", movieSchema);
