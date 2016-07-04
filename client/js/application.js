// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  // We don't use local GM
  //new GameManager(6, KeyboardInputManager, HTMLActuator, LocalStorageManager);

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-mFaW1-U4FyB1EMCD6KgdXDPxRNx_Hug",
    authDomain: "lots2048.firebaseapp.com",
    databaseURL: "https://lots2048.firebaseio.com",
    storageBucket: "lots2048.appspot.com",
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  var movesRef = database.ref('moves');
  var gameRef = database.ref('gameState');

  new KeyboardInputManager(movesRef); // Sends keyboard to move table
  new HTMLActuator(gameRef); // Gets gameState and updates html
});
