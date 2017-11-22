var express = require('express');
var app = express();

// Import controllers
var treesRoutes = require('./routes/treesRoutes');
var routeRoutes = require('./routes/routesRoutes');

app.use('/trees', treesRoutes);
app.use('/routes', routeRoutes);

module.exports = app;
