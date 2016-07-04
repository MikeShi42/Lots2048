var firebase = require("firebase");

// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  databaseURL: "https://lots2048.firebaseio.com/",
  serviceAccount: "./server/lots2048key.json"
});

// As an admin, the app has access to read and write all data, regardless of
// Security Rules
var db = firebase.database();

var gameRef = db.ref('gameState');
var moveRef = db.ref('moves');

moveRef.set({});
gameRef.set({});

gameRef.once("value", function(snapshot) {
  console.log(snapshot.val());
});

moveRef.on("child_added", function(snapshot, prevChildKey) {
  console.log(snapshot.val());
});

var GameManager = require('./js/GameManager');
var InputManager = require('./js/InputManager');
var Actuator = require('./js/Actuator');
var LocalStorageManager = require('./js/LocalStorageManager');

var inputManager = new InputManager(moveRef);
var actuator = new Actuator(gameRef);
var storageManager = new LocalStorageManager();
new GameManager(6, inputManager, actuator, storageManager);
