"use strict";

// Get database reference
var db = require('../shared/database');
var treesRef = db.ref('trees');
var trees;

// Register callbacks
treesRef.on("value", function(snapshot) {
  trees = snapshot.val();
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// Functions
var getTrees = function() {
	return new Promise((resolve) => {	
		resolve(trees);
	});
}

var getTreeById = function(id) {
	return new Promise((resolve) => {
		treesRef.orderByKey().equalTo(id).on("value", function(value) {
			resolve(value.val());
		});
	});
}

var getTreesByCategory = function(category) {
	return new Promise((resolve) => {
		treesRef.orderByChild('category').equalTo(category).on("value", function(value) {
			resolve(value.val());
		});
	});
}

// Export functions
module.exports.getTrees = getTrees;
module.exports.getTreeById = getTreeById;
module.exports.getTreesByCategory = getTreesByCategory;