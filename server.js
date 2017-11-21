var app = require('./index');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log("Listening on port " + port);
});
