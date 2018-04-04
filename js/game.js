
function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
 // this.canvas.width = window.innerWidth - 20; 
//  this.canvas.height = window.innerHeight - 20; 
  this.ctx = this.canvas.getContext("2d");
  this.snake = new Snake(this);
  this.score = 0;

  this.items = [];
}

Game.prototype.start = function() {
  clearInterval(this.intervalId);

  this.intervalId = setInterval(
    function() {
      this.clear();
      this.snake.move();
      this.snake.draw();
      if (this.items.length == 0) {
        this.generateItem("normal");
      } else if (this.items.length < 2) {
        this.items.forEach(
          function(e) {
            if (e.type != "normal") {
              this.generateItem("normal");
            } else {
              this.generateItem();
            }
          }.bind(this)
        );
      }
      this.items.forEach(function(e) {
        e.draw(e);
      });

      this.items.forEach(
        function(e, i) {
          if (this.itemEaten(e)) {
            debugger
            this.snake.disease = false; 
            
            switch (e.type) {
              case "speed-up":
                this.snake.speed = 50;
                this.start();
                break;

              case "disease":
                this.snake.disease = true;
                this.snake.speed = 100; 
                this.start();
                break;

              case "slow":
                this.snake.speed = 200;
                this.start();
                break;

              case "normal":
                this.snake.speed = 100;
                this.start();
                break;
            }
            this.items.splice(i, 1);
            this.score += e.points;
            this.generateScore();
            this.snake.grow();
          }
        }.bind(this)
      );
    }.bind(this),
    this.snake.speed
  );
};

Game.prototype.generateItem = function(tipo) {
  //función para generar cada item
  var item = new Item(this, tipo);
  this.items.push(item);
};

Game.prototype.generateScore = function() {
 var score =  document.createElement("h1")
 score.setAttribute("id","points")
 score.innerHTML = "Score: "+""+this.score;
 var divScore =  document.getElementById("score")
 divScore.removeChild(document.getElementById("points"));
 divScore.appendChild(score);
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.itemEaten = function(item) {
  if (
    /*condicion para coincidencia de las x (si solo estuviera esta
   cuando estuviera en el mismo punto del eje x, pero diferente en el y, saltaria) */
    this.snake.body[0].x < item.x + item.w &&
    this.snake.body[0].x + this.snake.w > item.x &&
    /*condición para la coincidencia de las y (si solo estuviera esta, cuando estuvieran 
      en el mismo punto del eje y, pero diferente en el x, saltaría)*/

    this.snake.body[0].y < item.y + item.h &&
    this.snake.body[0].y + this.snake.h > item.y
  ) {
    return true;
  } else {
    return false;
  }
};