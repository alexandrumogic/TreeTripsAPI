"use strict";

var db = require('../shared/database');
var admin = require('../shared/database').admin;
var usersRef = db.ref('users');
var treesRef = db.ref('trees');
var clientService = require('../shared/database').clientService;

var createUser = function(data) {
  return new Promise((resolve) => {
    admin.auth().createUser({
      email: data.email,
      emailVerified: false,
      password: data.password,
      displayName: data.name,
      disabled: false
    })
    .then(function(userRecord) {
      console.log("Successfully created new user:", userRecord.uid);
      resolve(userRecord.uid);
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
      resolve(error);
    });
  });
}

var deleteUser = function(data) {
  return new Promise((resolve) => {
    console.log(data.uid);
    admin.auth().deleteUser(data.uid)
      .then(function() {
        resolve("Successfully deleted user");
      })
      .catch(function(error) {
        resolve(error);
      });
  });
}

var verifyIdToken = function(idToken) {
  return new Promise((resolve, reject) => {
    admin.auth().verifyIdToken(idToken)
      .then(function(decodedToken) {
        var uid = decodedToken.uid;
         resolve(uid);
      }).catch(function(error) {
        reject(false);
      });
  });
}

var getUserRoutes = function(data) {
  return new Promise((resolve, reject) => {
    verifyIdToken(data.token).then((uid) => {
      usersRef.child(uid).child("routes").on("value", function(routes) {
        resolve(routes.val());
      })
    })
  });
}

var getUserTrees = function(data) {
  return new Promise((resolve, reject) => {
    verifyIdToken(data.token).then((uid) => {
      usersRef.child(uid).child("trees").on("value", function(trees) {
        resolve(trees.val());
      })
    })
  }).then((treesKeys) => {
    var keysArr = Object.keys(treesKeys).map(function(key) {
            return treesKeys[key];
      });

    return Promise.all(keysArr.map(key => treesRef.child(key).once('value')));
  });
}

var pushTreeIdToUserAddedTrees = function(treeId, uid) {
  return new Promise((resolve, reject) => {
      usersRef.child(uid).child("trees").push(treeId).then(resolve("OK"));
    }).catch((err) => {
      reject("Could not push tree id to user database.");
    });
}

var deleteUserRoute = function(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    verifyIdToken(data.token).then((uid) => {
      usersRef.child(uid).child("routes").child(data.routeKey).remove().then(resolve("OK"));
    }).catch((err) => {
      reject(err);
    });
  });
}

var addUserRoute = function(data) {
  return new Promise((resolve, reject) => {
    verifyIdToken(data.token).then((uid) => {
      usersRef.child(uid).child("routes").push(data.route).then(resolve("OK"));
    }).catch((err) => {
      reject("Token invalid or expired.");
    });
  });
}

module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.addUserRoute = addUserRoute;
module.exports.getUserRoutes = getUserRoutes;
module.exports.deleteUserRoute = deleteUserRoute;
module.exports.verifyIdToken = verifyIdToken;
module.exports.getUserTrees = getUserTrees;
module.exports.pushTreeIdToUserAddedTrees = pushTreeIdToUserAddedTrees;
