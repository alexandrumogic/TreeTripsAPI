var express = require('express');
var app = express();
var db = require('./controllers/database');
var treesController = require('./controllers/treesController');

app.use('/trees', treesController)

module.exports = app;
