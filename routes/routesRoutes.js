"use strict";

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var routesControler = require('../controllers/routesController');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', routesControler.findRoute);

module.exports = router;
