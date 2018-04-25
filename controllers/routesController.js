var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var routesData = require('../models/routesModel');

var findRoute = function(req, res) {
  routesData.findRoute(req.query).then(function(value) {
    console.log(value);
    res.status(200).send(value);
  });
}

var publicRoute = function(req, res) {
  if (!req.body) {
    res.status(400).send("Invalid request");
  }

  routesData.publicRoute(req.body).then((value) => {
    if (value == "Traseu publicat cu succes!") {
      	res.status(200).send(value);
    } else {
        res.status(500).send(value);
    }
  });
}

var getPublicRoutes = function(req, res) {
  routesData.getPublicRoutes().then((value) => {
    res.status(200).send(value);
  })
}

module.exports.findRoute = findRoute;
module.exports.publicRoute = publicRoute;
module.exports.getPublicRoutes = getPublicRoutes;
