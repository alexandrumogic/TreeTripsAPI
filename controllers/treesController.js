var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res) {

  res.status(200).send("OKKK");
})

module.exports = router;
