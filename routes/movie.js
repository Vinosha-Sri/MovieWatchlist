var express = require('express');
var router = express.Router();

let Movie = require('../models/movie'); // Movie model
let MovieController = require('../controllers/movie'); // Movie controller

// Get route for the Movies list (Read Operation)
router.get('/', MovieController.DisplayMovieList);

// Get route for Add Movie page (Create Operation)
router.get('/add', MovieController.AddMovie);

// Post route for processing Add Movie page (Create Operation)
router.post('/add', MovieController.ProcessAddMovie);

// Get route for displaying the Edit Movie page (Update Operation)
router.get('/edit/:id', MovieController.EditMovie);

// Post route for processing the Edit Movie page (Update Operation)
router.post('/edit/:id', MovieController.ProcessEditMovie);

// Get route to perform Delete Operation (Delete Operation)
router.get('/delete/:id', MovieController.DeleteMovie);

module.exports = router;
