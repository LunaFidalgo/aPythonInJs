function Mode(type) {
  if (type === 0) {
    this.initMode0();
  } else if (type === 1) {
    this.initMode1();
  }
}

Mode.prototype.initMode0 = function() {
  this.id = 0; 
  
  //INITIAL SNAKE
  this.SNAKE_SPEED = 75;
  this.SNAKE_COLOR = "#1fef61";
  this.background_color = "black"


  //ITEMS TYPES
  this.ITEM_DISEASE = {
    type: "disease",
    points: 100,
    color: "yellow",
    code: "NaN",
    w: 48,
    h: 20,
    snake_speed: this.SNAKE_SPEED
  };

  this.ITEM_SPEEDUP = {
    type: "speed-up",
    points: 30,
    color: "#ef1fad",
    code: "1",
    snake_speed: this.SNAKE_SPEED / 2
  };

  this.ITEM_SLOW = {
    type: "slow",
    points: 30,
    color: "#1f45ef",
    code: "0",
    snake_speed: this.SNAKE_SPEED * 2
  };

  this.ITEM_NORMAL = {
    type: "normal",
    points: 10,
    color: "#fd5f00",
    code: "$",
    snake_speed: this.SNAKE_SPEED
  };
};

Mode.prototype.initMode1 = function() {
  this.background_color = "#A3C23D";
  this.id = 1; 
  this.gameOverColor = "#564012"
  //INITIAL SNAKE SPEED
  this.SNAKE_SPEED = 75;
  this.SNAKE_COLOR = "#564012";
  //ITEMS TYPES

  this.ITEM_DISEASE = {
    type: "disease",
    points: 100,
    color: "yellow",
    w: 48,
    h: 20,
    snake_speed: this.SNAKE_SPEED
  };

  this.ITEM_SPEEDUP = {
    type: "speed-up",
    points: 30,
    color: "red",
    snake_speed: this.SNAKE_SPEED / 2
  };

  this.ITEM_SLOW = {
    type: "slow",
    points: 30,
    color: "blue",
    snake_speed: this.SNAKE_SPEED * 2
  };

  this.ITEM_NORMAL = {
    type: "normal",
    points: 10,
    color: "#564012",
    snake_speed: this.SNAKE_SPEED
  };
};

//CONTROL KEYS
KEY_LEFT = 65;
KEY_RIGHT = 68;
KEY_UP = 87;
KEY_DOWN = 83;
