const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const Assignment = require("./models/assignment");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/assignment_tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  const assignments = await Assignment.find();
  res.render("index", { assignments });
});

app.get("/assignments/new", (req, res) => {
  res.render("new");
});
app.post("/assignments", async (req, res) => {
  await Assignment.create(req.body.assignment);
  res.redirect("/");
});

app.get("/assignments/:id/edit", async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  res.render("edit", { assignment });
});

app.put("/assignments/:id", async (req, res) => {
  await Assignment.findByIdAndUpdate(req.params.id, req.body.assignment);
  res.redirect("/");
});

app.delete("/assignments/:id", async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
