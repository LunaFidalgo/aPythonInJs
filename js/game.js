function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
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
      this.generateItem();

      this.drawAll();

      this.items.forEach(
        function(e, i) {
          if (this.itemEaten(e)) {
            this.snake.disease = false;
            this.itemEffect(e.type);
            this.items.splice(i, 1);

            this.generateScore(e.points);
            this.snake.grow();
          }
        }.bind(this)
      );
    }.bind(this),
    this.snake.speed
  );
};

Game.prototype.itemEffect = function(type) {
  switch (type) {
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
};

Game.prototype.generateItem = function() {
  if (this.items.length == 0) {
    this.setItem("normal");
  } else if (this.items.length < 2) {
    this.items.forEach(
      function(e) {
        if (e.type != "normal") {
          this.setItem("normal");
        } else {
          this.setItem();
        }
      }.bind(this)
    );
  }
};

Game.prototype.setItem = function(tipo) {
  var item = new Item(this, tipo);
  this.items.push(item);
};

Game.prototype.generateScore = function(points) {
  this.score += points;
  var score = document.createElement("h1");
  score.setAttribute("id", "points");
  score.innerHTML = "Score: " + "" + this.score;
  var divScore = document.getElementById("score");
  divScore.removeChild(document.getElementById("points"));
  divScore.appendChild(score);
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.itemEaten = function(item) {
  if (
    this.snake.body[0].x < item.x + item.w &&
    this.snake.body[0].x + this.snake.w > item.x &&
    this.snake.body[0].y < item.y + item.h &&
    this.snake.body[0].y + this.snake.h > item.y
  ) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.drawAll = function() {
  this.snake.draw();
  this.items.forEach(function(e) {
    e.draw(e);
  });
};

Game.prototype.gameOver = function() {
  this.ctx.font = "50px 'Press Start 2P'";
  this.ctx.fillText(
    "GAME OVER",
    this.canvas.width / 2 - 200,
    this.canvas.height / 2
  );
  clearInterval(this.intervalId);
};
