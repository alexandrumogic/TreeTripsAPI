"use strict";

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var haltsControler = require('../controllers/haltsController');

router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', haltsControler.getHalts);

module.exports = router;
