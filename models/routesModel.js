"use strict";

var googleMaps = require('@google/maps').createClient({
  key: 'AIzaSyBLfs4ab6ODh4tuJkR7r38lhEaw_kKc_ZI',
  Promise: Promise
});

var findRoute = function(data) {
    return googleMaps.directions({
      origin: data.origin,
      destination: data.destination,
      mode: 'walking',
      waypoints: [],
      alternatives: true,
      optimize: true,
    }).asPromise().then(response => response.json.routes)
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
