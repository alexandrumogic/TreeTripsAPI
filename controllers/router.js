"use strict";

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res) {
  if (err) return res.status(500).send("There was a problem finding the users.");
  res.status(200).send("OKKK");
})

module.exports = router;
