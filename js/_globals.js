//INITIAL SNAKE SPEED
SNAKE_SPEED = 100; 
SNAKE_COLOR = "#1fef61";

//ITEMS TYPES

ITEM_DISEASE = {  
  type : "disease",
  points : 100,
  color :"yellow",
  code : "NaN",
  w : 48,
  h:  20,
  snake_speed: SNAKE_SPEED
}

ITEM_SPEEDUP = {    
  type : "speed-up",
  points:  30,
  color:  "#ef1fad",
  code: "1",
  snake_speed: SNAKE_SPEED/2
}

ITEM_SLOW = {
  type: "slow",
  points:  30,
  color:  "#1f45ef",
  code:  "0",
  snake_speed: SNAKE_SPEED*2
}

ITEM_NORMAL = {
  type :"normal",
  points: 10,
  color: "#fd5f00",
  code : "$",
  snake_speed: SNAKE_SPEED
}

//CONTROL KEYS
KEY_LEFT = 65;
KEY_RIGHT = 68;
KEY_UP = 87;
KEY_DOWN = 83;

