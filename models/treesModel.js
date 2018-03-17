"use strict";

// Get database reference
var db = require('../shared/database');
var treesRef = db.ref('trees');
var treesCategoriesRef = db.ref('trees-categories');
var trees;
var treesCategories;

// Register callbacks
treesRef.on("value", function(snapshot) {
  trees = snapshot.val();
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

treesCategoriesRef.on("value", function(snapshot) {
  treesCategories = snapshot.val();
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// Functions
var getTrees = function() {
	return new Promise((resolve) => {
		resolve(trees);
	});
}

var postTree = function(req) {
  return new Promise((resolve) => {
    treesRef.push(req);
    resolve();
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

var getCategories = function() {
  return new Promise((resolve) => {
		resolve(treesCategories);
	});
}

// Export functions
module.exports.getTrees = getTrees;
module.exports.postTree = postTree;
module.exports.getTreeById = getTreeById;
module.exports.getTreesByCategory = getTreesByCategory;
module.exports.getCategories = getCategories;
