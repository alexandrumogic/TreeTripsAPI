var express = require('express');
var app = express();

// Import controllers
var treesRoutes = require('./routes/treesRoutes');
var routeRoutes = require('./routes/routesRoutes');
var usersRoutes = require('./routes/usersRoutes');
var haltsRoutes = require('./routes/haltsRoutes');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/trees', treesRoutes);
app.use('/routes', routeRoutes);
app.use('/user', usersRoutes);
app.use('/halts', haltsRoutes);

module.exports = app;
