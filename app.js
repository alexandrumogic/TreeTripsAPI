var express = require('express');
var app = express();

// Import controllers
var treesRoutes = require('./routes/treesRoutes');
var routeRoutes = require('./routes/routesRoutes');
var usersRoutes = require('./routes/usersRoutes');
var haltsRoutes = require('./routes/haltsRoutes');

app.use('/trees', treesRoutes);
app.use('/routes', routeRoutes);
app.use('/user', usersRoutes);
app.use('/halts', haltsRoutes);

module.exports = app;
