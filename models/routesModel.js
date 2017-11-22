"use strict";

var googleMaps = require('@google/maps').createClient({
  key: 'AIzaSyBLfs4ab6ODh4tuJkR7r38lhEaw_kKc_ZI',
  Promise: Promise
});

// var origin = {
//   lat: '45.59962654582255',
//   lng: '24.9169921875'
// }
//
// var destination = {
//   lat: '45.74836030216746',
//   lng: '24.20562744140625'
// }

var findRoute = function(data) {
  console.log("ROUTESMODEL\n\n");
  console.log(data);
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

}

var findRouteToFirstTreeByCategory = function() {

}

module.exports.findRoute = findRoute;
