var router = express.Router();
var admin = require("firebase-admin");
var serviceAccount = require("../shared/plant-a-tree-1500736699098-firebase-adminsdk-2cfbi-c5c0ca5ba3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://plant-a-tree-1500736699098.firebaseio.com"
});

var db = admin.database();
var ref = db.ref('/trees');
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

router.get('/', )
