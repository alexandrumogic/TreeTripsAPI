"use strict";

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var usersController = require('../controllers/usersController');

router.use(bodyParser.urlencoded({ extended: true }));
router.post('/', usersController.createUser);
router.delete('/', usersController.deleteUser);
router.post('/login', usersController.loginUser);
router.post('/routes', usersController.addUserRoute);
router.get('/routes', usersController.getUserRoutes);
router.delete('/routes', usersController.deleteUserRoute);

module.exports = router;
