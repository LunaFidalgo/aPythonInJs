/*Clase que representa el juego*/

function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.snake = new Snake(this);
  this.item = new Item(this);
}

Game.prototype.start = function() {
  this.intervalId = setInterval(
    function() {
     
      this.clear();
      this.snake.move();
      this.snake.draw();
      this.item.draw();
      if (this.itemEaten()) {
       
       /* this.item.x = this.item.x + 40; 
        this.item.y = this.item.y;
        */
        /*
        this.item.x = Math.floor(Math.random()*this.canvas.width-this.snake.w)
        this.item.y = Math.floor(Math.random()*this.canvas.height-this.snake.h)
        */
        //necesito que el antiguo desaparezca 
        //necesito que aparezca uno nuevo
        //cambio las x y las y del antiguo por el nuevo

        //necesito que el cuerpo de la serpiente aumente en 1 cada vez que coma un item
        this.snake.grow();
      }
    }.bind(this),
    500
  );
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.itemEaten = function() {
  debugger;
  if (
  
    /*condicion para coincidencia de las x (si solo estuviera esta
   cuando estuviera en el mismo punto del eje x, pero diferente en el y, saltaria) */
    this.snake.body[0].x < this.item.x + this.item.w &&
    this.snake.body[0].x + this.snake.w > this.item.x &&
    /*condición para la coincidencia de las y (si solo estuviera esta, cuando estuvieran 
      en el mismo punto del eje y, pero diferente en el x, saltaría)*/

    this.snake.body[0].y < this.item.y + this.item.h &&
    this.snake.body[0].y + this.snake.h > this.item.y
  ) {
  
    return true;
  } else {
    return false;
  }
};

/////////////////////////////////////////////////////////////////////////////////
///////////////////// COLISIONES GÉNERICAS //////////////////////////////////////
/*if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x &&
  object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) { }*/
