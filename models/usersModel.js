"use strict";

var db = require('../shared/database');
var admin = require('../shared/database').admin;
var usersRef = db.ref('users');
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
      resolve("User created successfully");
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

var loginUser = function(data) {
  return new Promise((resolve, reject) => {
    clientService.auth().signInWithEmailAndPassword(data.email,data.password).then((user) => {            
      user.getIdToken(true).then((token)=>{
              resolve(token);
          }).catch((err)=>{
              reject(false);
          });
      }).catch((err)=>{
          reject(err);
      });
  });
}


var getUserRoutes = function(data) {
  return new Promise((resolve, reject) => {
    console.log(data);
    verifyIdToken(data.token).then((uid) => {
      usersRef.child(uid).child("routes").on("value", function(routes) {
        resolve(routes.val());
      })
    })
  });  
}

var deleteUserRoute = function(data) {
  return new Promise((resolve, reject) => {
    console.log(data);
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
module.exports.loginUser = loginUser;
module.exports.addUserRoute = addUserRoute;
module.exports.getUserRoutes = getUserRoutes;
module.exports.deleteUserRoute = deleteUserRoute;
