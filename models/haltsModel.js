"use strict";

// Get database reference
var db = require('../shared/database');
var haltsRef = db.ref('halts');
var halts;

// Register callbacks
haltsRef.on("value", function(snapshot) {
  halts = snapshot.val();
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// Functions
var getHalts = function() {
	return new Promise((resolve) => {
		resolve(halts);
	});
}

// Export functions
module.exports.getHalts = getHalts;
