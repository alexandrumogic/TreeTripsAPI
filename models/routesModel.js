"use strict";

var googleMaps = require('@google/maps').createClient({
  key: 'AIzaSyBLfs4ab6ODh4tuJkR7r38lhEaw_kKc_ZI',
  Promise: Promise
});

var findRoute = function(data) {
    console.log(data);

    return googleMaps.directions({
      origin: {lat: data.sPtLat, lng: data.sPtLng},
      destination: {lat: data.ePtLat, lng: data.ePtLng},
      mode: 'walking'
    }).asPromise().then(response => response.json)
    .catch(err => console.log(err));
}

var findRouteToFirstTree = function() {
  // ia ca input destinatia userului
  // si compara cu coord pomilor din bd

  // limitare: 25 de destinatii per request
}

var findRouteToFirstTreeByCategory = function() {

}

module.exports.findRoute = findRoute;
