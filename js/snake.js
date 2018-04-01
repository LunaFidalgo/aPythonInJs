var KEY_LEFT = 65; //para mover a la izquierda => con la A
var KEY_RIGHT = 68; //para mover a la derecha (avanzar) => la D
var KEY_UP = 87; //para mover hacia arriba => la W
var KEY_DOWN = 83; //para ir hacia abajo => con la S

function Snake(game) {
  this.game = game;

  /*
  
  x => necesitas el ancho => width
  y => necesitas la altura => height
  */

  this.x = this.game.canvas.width / 2; //posicion x de la cabeza de la serpiente
  this.y = this.game.canvas.height / 2; //posición y de la cabeza de la serpiente

  this.w = 20; //ANCHO PROVISIONAL DE LA SERPIENTE
  this.h = 20;
  this.setListeners();

  this.body = [
    {
      x: this.x,
      y: this.y, 
      direction: this.direction
    }
  ];

  this.direction; //variable para reflejar la dirección hacia la que esta moviendose
  //la cabeza de la serpiente
}

Snake.prototype.setListeners = function() {
  
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case KEY_RIGHT:
        this.direction = "RIGHT";
        break;

      case KEY_DOWN:
        this.direction = "DOWN";
        break;

      case KEY_UP:
        this.direction = "UP";
        break;

      case KEY_LEFT:
        this.direction = "LEFT";
        break;
    }
  }.bind(this);
};

Snake.prototype.draw = function() {
  /**/

  for (var i = 0; i < this.body.length; i++) {
 
    this.game.ctx.fillRect(this.body[i].x, this.body[i].y, this.w, this.h);
  }

  // this.game.ctx.fillStyle= "black";

  // this.game.ctx.fillStyle= "#FF0000";
};

Snake.prototype.move = function() {

  switch (this.direction) {
    
    case "RIGHT":
      //hay que mover todo el cuerpo de la serpiente
      for (var i = 0; i < this.body.length; i++) {
        if(i===0){
          this.body[i].x = this.body[i].x + this.w
        }else{
          this.body[i].x = this.body[i].x + this.w
        }
        
      }
      break;
/*
      if (this.x <= this.game.canvas.width) {
        this.x = this.x + 10;
        break;
      } else {
        this.x = 0;
      }*/

    case "DOWN":
      this.y = this.y + 10;
      break;

    case "UP":

    for (var i = 0; i < this.body.length; i++) {
      if(i===0){
        this.body[i].y = this.body[i].y - this.w
      }else{
      //  this.body[i].y = this.body[i].y - this.w
      }
      
    }
    break;

    /*
      this.y = this.y - 10;
      break;
*/
    case "LEFT":
      if (this.x >= 0) {
        this.x = this.x - 10;
        break;
      } else {
        this.x = this.x + this.game.canvas.width;
      }

      this.x = this.x - 10;
      break;
  }
};

Snake.prototype.grow = function() {

  if(this.direction == "RIGHT"){
  
    this.body.push({ x: this.x + this.w*this.body.length, y: this.y });
  
  }

};
