const Controller = function() {
  this.left = new Controller.ButtonInput();
  this.right = new Controller.ButtonInput();
  this.up = new Controller.ButtonInput();
  this.touch = new Controller.TouchInput();

  this.keyDownUp = function(type, key_code) {
    var down = type === "keydown" ? true : false;

    switch (key_code) {
      default:
      case 37:
        this.left.getInput(down);
        break;
      case 38:
        this.up.getInput(down);
        break;
      case 39:
        this.right.getInput(down);
    }
  };

  this.GetTouchInput = function(type, x, canvas){
    
    if(type === "touchstart"){
      var rect = canvas.getBoundingClientRect();
      var size = rect.right - rect.left;
      var scaledX = 256 * (x - rect.left) / size;
      this.touch.getInput(scaledX, true);
    }
    else if(type === "touchend"){
      this.touch.getInput(0, false);
    }
  };
};

Controller.prototype = {
  constructor: Controller
};

Controller.ButtonInput = function() {
  this.active = this.down = false;
};

Controller.ButtonInput.prototype = {
  constructor: Controller.ButtonInput,

  getInput: function(down) {
    if (this.down !== down) this.active = down;
    this.down = down;
  }
};

Controller.TouchInput = function() {
  this.active = false;
  this.x = 0;
}

Controller.TouchInput.prototype = {
  constructor: Controller.TouchInput,

  getInput: function(x, active) {
    if(active){
      this.x = x;
      this.active = active;
    }
    else{
      this.active = active;
    }
  }
}
