"use strict";

// Get database reference
var db = require('../shared/database');
var multer = db.multer;
var bucket = db.bucket;
var treesRef = db.ref('trees');
var treesCategoriesRef = db.ref('trees-categories');
var pushTreeIdToUserAddedTrees = require('./usersModel').pushTreeIdToUserAddedTrees;
var trees;
var treesCategories;

const format = require('util').format;

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

var postTree = function(data, file, uid) {
  return new Promise((resolve) => {
    if (file) {
      uploadImageToStorage(file).then((imgLink) => {
        var tree = {
          category: data.category,
          coords: {
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lng)
          },
          icon: "./assets/img/trees-categories/" + data.category + ".png",
          img: imgLink,
          info: data.description
        }

        treesRef.push(tree).then((snap) => {
          console.log(snap.key);
          pushTreeIdToUserAddedTrees(snap.key, uid);
        });
        resolve();
      }).catch((error) => {
        console.error(error);
        resolve();
      });
    }
  });
}

const uploadImageToStorage = (file) => {
  let prom = new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      console.log(error);
      reject('Something is wrong! Unable to upload at the moment.');
    });
    blobStream.on('finish', () => {
      fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      }).then(signedUrls => {
        resolve(signedUrls[0]);
      });
    });
    blobStream.end(file.buffer);
  });
  return prom;
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
