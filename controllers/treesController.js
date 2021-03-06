"use strict";

var treesData = require('../models/treesModel');
var verifyIdToken = require('../models/usersModel').verifyIdToken;

var getTrees = function(req, res) {
	treesData.getTrees().then(function(value) {
		res.status(200).send(value);
	});
};

var postTree = function(req, res) {
	if (!req.body.lat || !req.body.lng || !req.body.token) {
		return res.status(400).send("Bad request.");
	}
	verifyIdToken(req.body.token).then((uid) => {
		treesData.postTree(req.body, req.file, uid).then(function(value) {
			res.status(200).send("Pom adaugat cu succes.");
		});
	})

}

var getTreeById = function(req, res) {
	if (!req.params.id) {
		return status(400).send("Bad request.");
	}
	treesData.getTreeById(req.params.id).then(function(value) {
		res.status(200).send(value);
	});
};

var getTreesByCategory = function(req, res) {
	if (!req.params.category) {
		return status(400).send("Bad request.");
	}
	try {
		treesData.getTreesByCategory(req.params.category).then(function(value) {
			res.status(200).send(value);
		});
	} catch (error) {
		res.status(500);
	}
}

var getCategories = function(req, res) {
	treesData.getCategories().then(function(value) {
		res.status(200).send(value);
	})
}

module.exports.getTreesByCategory = getTreesByCategory;
module.exports.getTrees = getTrees;
module.exports.postTree = postTree;
module.exports.getTreeById = getTreeById;
module.exports.getCategories = getCategories;
