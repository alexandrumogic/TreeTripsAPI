var express = require('express');
var app = express();

// Import controllers
var treesRoutes = require('./routes/treesRoutes');
var routeRoutes = require('./routes/routesRoutes');
var usersRoutes = require('./routes/usersRoutes');

app.use('/trees', treesRoutes);
app.use('/routes', routeRoutes);
app.use('/user', usersRoutes);

module.exports = app;
