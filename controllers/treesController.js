"use strict";

var treesData = require('../models/treesModel');

var getTrees = function(req, res) {
	treesData.getTrees().then(function(value) {
		res.status(200).send(value);
	});
};

var postTree = function(req, res) {
		treesData.postTree(req.body).then(function(value) {
			res.status(200).send("Posted OK");
		});
}

var getTreeById = function(req, res) {
	treesData.getTreeById(req.params.id).then(function(value) {
		res.status(200).send(value);
	});
};

var getTreesByCategory = function(req, res) {
	try {
		treesData.getTreesByCategory(req.params.category).then(function(value) {
			res.status(200).send(value);
		});
	} catch (error) {
		res.status(500);
	}
}

module.exports.getTreesByCategory = getTreesByCategory;
module.exports.getTrees = getTrees;
module.exports.postTree = postTree;
module.exports.getTreeById = getTreeById;
