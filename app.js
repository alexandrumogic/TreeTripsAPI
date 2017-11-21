var express = require('express');
var app = express();

// Import controllers
var treesController = require('./controllers/treesController');
var treesRoutes = require('./routes/treesRoutes');
//var routesController = require('./controllers/routesController');
//var usersController = require('./controllers/usersController');

app.use('/trees', treesRoutes);
//app.use('/route', routesController);
//app.use('/user', usersController);

module.exports = app;
