"use strict";

var admin = require("firebase-admin");
var clientService = require("firebase");
var serviceAccount = require("./plant-a-tree-1500736699098-firebase-adminsdk-2cfbi-c5c0ca5ba3.json");
const googleStorage = require('@google-cloud/storage');
const Multer = require('multer');

 var clientServiceConfig = {
    apiKey: "AIzaSyAoQrJbN_JiLCKOtMT65saGar8Mkho3H8s",
    authDomain: "plant-a-tree-1500736699098.firebaseapp.com",
    databaseURL: "https://plant-a-tree-1500736699098.firebaseio.com",
    projectId: "plant-a-tree-1500736699098",
    storageBucket: "plant-a-tree-1500736699098.appspot.com",
    messagingSenderId: "1016801216988"
 };

clientService.initializeApp(clientServiceConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://plant-a-tree-1500736699098.firebaseio.com"
});

var db = admin.database();


const storage = googleStorage({
  projectId: "AIzaSyAoQrJbN_JiLCKOtMT65saGar8Mkho3H8s",
  keyFilename: "./shared/plant-a-tree-1500736699098-firebase-adminsdk-2cfbi-c5c0ca5ba3.json"
});

const bucket = storage.bucket("gs://plant-a-tree-1500736699098.appspot.com");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});


module.exports = db;
module.exports.admin = admin;
module.exports.clientService = clientService;
module.exports.multer = multer;
module.exports.bucket = bucket;
