"use strict";

var usersData = require('../models/usersModel');

var createUser = function(req, res) {
	if (!req.body) {
		return status(400).send("Bad request.");
	}
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
		if (value == "Error")
		{
			res.status(400).send("User sau parola incorecte. Incercati din nou.");
		} else
		{
			res.status(200).send(value);
		}
  })
}

var addUserRoute = function(req, res) {
  usersData.addUserRoute(req.body).then((value) => {
  	res.status(200).send(value);
  })
}

var getUserRoutes = function(req, res) {
  usersData.getUserRoutes(req.query).then((value) => {
  	res.status(200).send(value);
  })
}

var getUserTrees = function(req, res) {
	usersData.getUserTrees(req.query).then((value) => {
		res.status(200).send(value);
	})
}

var deleteUserRoute = function(req, res) {
	usersData.deleteUserRoute(req.query).then((value) => {
		res.status(200).send(value);
	})
}

module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.loginUser = loginUser;
module.exports.addUserRoute = addUserRoute;
module.exports.getUserRoutes = getUserRoutes;
module.exports.deleteUserRoute = deleteUserRoute;
module.exports.getUserTrees = getUserTrees;
