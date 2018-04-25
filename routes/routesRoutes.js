"use strict";

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var routesControler = require('../controllers/routesController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', routesControler.findRoute);
router.post('/public', routesControler.publicRoute);
router.get('/public', routesControler.getPublicRoutes);

module.exports = router;
