var express = require('express');
var app = express();

// Import controllers
var treesRoutes = require('./routes/treesRoutes');
var routeRoutes = require('./routes/routesRoutes');
var usersRoutes = require('./routes/usersRoutes');
var haltsRoutes = require('./routes/haltsRoutes');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/trees', treesRoutes);
app.use('/routes', routeRoutes);
app.use('/user', usersRoutes);
app.use('/halts', haltsRoutes);

module.exports = app;
