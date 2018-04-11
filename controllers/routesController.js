var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var routesData = require('../models/routesModel');

var findRoute = function(req, res) {
  console.log(req);
  routesData.findRoute(req.query).then(function(value) {
    console.log(value);
    res.status(200).send(value);
  });
}

module.exports.findRoute = findRoute;
