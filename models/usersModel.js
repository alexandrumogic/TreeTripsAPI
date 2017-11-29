"use strict";

var db = require('../shared/database');
var admin = require('../shared/database').admin;
var usersRef = db.ref('users');

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

var loginUser = function(data) {
  return new Promise((resolve) => {
    admin.auth().getUserByEmail(data.email)
    .then(function(userRecord) {
      // if (data.password == userRecord.password)
        console.log("Successfully fetched user data:", userRecord.toJSON());
        resolve("OK");
      })
      .catch(function(error) {
        console.log("Error fetching user data:", error);
        resolve(error);
    });
  });
}

var logOutUser = function() {

}

var getUserRoutes = function() {

}

var deleteUserRoute = function() {

}

module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.loginUser = loginUser;
