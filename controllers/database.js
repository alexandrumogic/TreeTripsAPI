"use strict";

var admin = require("firebase-admin");
var serviceAccount = require("../shared/plant-a-tree-1500736699098-firebase-adminsdk-2cfbi-c5c0ca5ba3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://plant-a-tree-1500736699098.firebaseio.com"
});

var dbFire = admin.database();
