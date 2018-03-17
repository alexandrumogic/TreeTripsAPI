"use strict";

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var treesControler = require('../controllers/treesController');

router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', treesControler.getTrees);
router.post('/', treesControler.postTree);
router.get('/id/:id', treesControler.getTreeById);
router.get('/category/:category', treesControler.getTreesByCategory);
router.get('/categories', treesControler.getCategories);

module.exports = router;
