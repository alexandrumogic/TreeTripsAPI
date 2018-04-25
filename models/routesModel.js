"use strict";
var publicRoutesRef = require('../shared/database').ref('public-routes');
var publicRoutes;

var googleMaps = require('@google/maps').createClient({
  key: 'AIzaSyBLfs4ab6ODh4tuJkR7r38lhEaw_kKc_ZI',
  Promise: Promise
});

// Register callbacks
publicRoutesRef.on("value", function(snapshot) {
  publicRoutes = snapshot.val();
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

var getPublicRoutes = function() {
	return new Promise((resolve) => {
		resolve(publicRoutes);
	});
}

var findRoute = function(data) {
    console.log(data);

    return googleMaps.directions({
      origin: {lat: data.sPtLat, lng: data.sPtLng},
      destination: {lat: data.ePtLat, lng: data.ePtLng},
      mode: 'walking'
    }).asPromise().then(response => response.json)
    .catch(err => console.log(err));
}

var publicRoute = function(data) {
  return new Promise((resolve, reject) => {
    publicRoutesRef.push(data.route).then(resolve("Traseu publicat cu succes!"));
  }).catch((err) => {
    reject("Traseul nu a putut fi adaugat in BD.");
  });
}

var findRouteToFirstTree = function() {
  // ia ca input destinatia userului
  // si compara cu coord pomilor din bd

  // limitare: 25 de destinatii per request
}

var findRouteToFirstTreeByCategory = function() {

}

module.exports.findRoute = findRoute;
module.exports.publicRoute = publicRoute;
module.exports.getPublicRoutes = getPublicRoutes;
