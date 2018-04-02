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
      direction: this
        .direction /*IDEA: que cada parte de la serpiente tenga una dirección*/
    }
  ];

  this.breakpoint = [];

  this.direction; //variable para reflejar la dirección hacia la que esta moviendose
  //la cabeza de la serpiente
}

Snake.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case KEY_RIGHT:
        this.body[0].direction = "RIGHT";

        break;

      case KEY_DOWN:
        this.direction = "DOWN";
        break;

      case KEY_UP:
        this.body[0].direction = "UP";
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
    // this.game.ctx.fillStyle= "black";
    this.game.ctx.fillRect(this.body[i].x, this.body[i].y, this.w, this.h);
    // this.game.ctx.fillStyle= "#FF0000";
  }
};

Snake.prototype.move = function() {
  for (var i = 0; i < this.body.length; i++) {
    switch (this.body[i].direction) {
      case "RIGHT":
        this.body[i].x = this.body[i].x + this.w;

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
        this.body[i].y = this.body[i].y - this.w;
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
  }
  this.heredaMove();
};



Snake.prototype.heredaMove = function() {

    for (var i = 1; i < this.body.length; i++) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
  }
};




Snake.prototype.movePruebas = function() {
  //IDEA: break point de giro
  /**/

  if (
    this.body.length > 1 &&
    this.body[0].direction != this.body[1].direction
  ) {
    //ha habido un cambio de dirección => establecemos breakpoint de giro
    console.log("ha habido un cambio de dirección");

    this.body[i].direction = this.body[i - 1].direction;

    this.breakpoint.push({ x: this.body[0].x, y: this.body[0].y });
    console.log(this.breakpoint);
    //  console.log(this.body[0].x, this.body[0].y);
    // console.log(this.breakpoint);
  }

  for (var i = 1; i < this.body.length; i++) {
    // if(this.body[0].direction == "RIGHT" && this.body[i].direction == "UP"){
    //   console.log("CASO QUE QUIERES REFLEJAR")
    //   console.log(this.body[i].direction)
    //   this.body[i].direction = this.body[i - 1].direction;
    // }
    if (
      this.breakpoint.length != 0 &&
      this.body[i].x == this.breakpoint[0].x &&
      Math.abs(this.body[i].y - this.w) == this.breakpoint[0].y
    ) {
      console.log("PASO POR EL BREAKPOINT----");
      //  this.body[i].direction = this.body[i - 1].direction;
      if (i === this.body.length - 1) {
        console.log("LIMPIAMOS EL BREAKPOINT");
        //el ultimo ha pasado por el breakpoint
        this.breakpoint = [];
      }
    }
  }
};

Snake.prototype.grow = function() {
  if (this.body[0].direction == "RIGHT") {
    this.body.push({
      x: this.x + this.w * this.body.length,
      y: this.y,
      direction: "RIGHT"
    });
  } else if (this.body[0].direction == "UP") {
  }
};
