function InputManager(databaseRef) {
  this.events = {};

  this.listen(databaseRef);
}

InputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

InputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

InputManager.prototype.listen = function (databaseRef) {
  var self = this;
/*
    38: 0, // Up
    39: 1, // Right
    40: 2, // Down
    37: 3, // Left
*/

  databaseRef.on("child_added", function(snapshot){//, prevChildKey) {
    console.log(snapshot.val());
    self.emit("move", snapshot.val());
  });
};

InputManager.prototype.restart = function (event) {
  event.preventDefault();
  this.emit("restart");
};

InputManager.prototype.keepPlaying = function (event) {
  event.preventDefault();
  this.emit("keepPlaying");
};

InputManager.prototype.bindButtonPress = function (selector, fn) {
  var button = document.querySelector(selector);
  button.addEventListener("click", fn.bind(this));
  button.addEventListener(this.eventTouchend, fn.bind(this));
};

module.exports = InputManager;
