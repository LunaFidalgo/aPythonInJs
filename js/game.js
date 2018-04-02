/*Clase que representa el juego*/

function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.snake = new Snake(this);
  this.item = new Item(this, "normal");
  this.score = 0;
  this.prueba = true;
  this.otra = true; 
}

Game.prototype.start = function() {

 
    clearInterval(this.intervalId)
   
    this.intervalId = setInterval(
      function() {
        this.clear();
        this.snake.move();
        this.snake.draw();
        this.item.draw();

        if (this.itemEaten()) {
          switch (this.item.type) {
            case "speed-up":
            this.snake.speed = 30;
            this.otra = false; 
            this.start();
              break;

            case "desease":
              this.snake.desease = true;

              case "normal": 
              this.snake.speed = 100;
              this.start();
              //clearInterval(this.intervalId);

          }
          this.score++;
          document.getElementById("score").innerHTML =
            this.score + " " + "Points";
            if(this.otra){
               this.item = new Item(this, "speed-up");
            }else{
              this.item = new Item(this, "normal");
            }
         
         // this.item = new Item(this, "normal")
          this.snake.grow();
        }
      }.bind(this),
     this.snake.speed
    );
  
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.itemEaten = function() {
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
    console.log("SE LA COME");
    return true;
  } else {
    return false;
  }
};

/////////////////////////////////////////////////////////////////////////////////
///////////////////// COLISIONES GÉNERICAS //////////////////////////////////////
/*if (object1.x < object2.x + object2.width && object1.x + object1.width > object2.x &&
  object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) { }*/