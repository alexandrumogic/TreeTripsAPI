"use strict";

var haltsData = require('../models/haltsModel');

var getHalts = function(req, res) {
	haltsData.getHalts().then(function(value) {
		res.status(200).send(value);
	});
};

module.exports.getHalts = getHalts;
