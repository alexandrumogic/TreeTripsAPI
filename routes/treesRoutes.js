"use strict";

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var treesControler = require('../controllers/treesController');
var multer = require('../shared/database').multer;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', treesControler.getTrees);
router.post('/', multer.single('file'), treesControler.postTree);
router.get('/id/:id', treesControler.getTreeById);
router.get('/category/:category', treesControler.getTreesByCategory);
router.get('/categories', treesControler.getCategories);

module.exports = router;
