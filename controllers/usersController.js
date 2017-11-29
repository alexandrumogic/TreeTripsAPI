"use strict";

var usersData = require('../models/usersModel');

var createUser = function(req, res) {
  usersData.createUser(req.body).then(function(value) {
    res.status(200).send(value);
  });
}

var deleteUser = function(req, res) {
  usersData.deleteUser(req.body).then(function(value) {
    res.status(200).send(value);
  });
}

var loginUser = function(req, res) {
  usersData.loginUser(req.body).then(function(value) {
    res.status(200).send(value);
  })
}

module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.loginUser = loginUser;
