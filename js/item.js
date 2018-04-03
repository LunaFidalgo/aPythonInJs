function Item(game, type) {
  this.game = game;
  this.x = Math.floor(
    Math.random() * (this.game.canvas.width - this.game.snake.w - 100)
  );
  this.y = Math.floor(
    Math.random() * (this.game.canvas.height - this.game.snake.h - 100)
  );
  this.w = 8;
  this.h = 8;
  

  this.generate(type);
}

Item.prototype.draw = function(e) {
  this.game.ctx.fillStyle = e.color;
  this.game.ctx.fillRect(e.x, e.y, e.w, e.h);
};

Item.prototype.generate = function(type) {
  debugger;
  console.log(typeof(type))
  if (typeof(type) == "string" ) {
    this.type = "normal";
    this.points = 10;
    this.color = "black";
  } else {
    var random = Math.floor(Math.random() * 3);
    switch (random) {
      case 0:
        this.type = "disease";
        this.points = 100;
        this.color = "green";
        this.timeLife = 200;
        break;

      case 1:
        this.type = "speed-up";
        this.points = 100;
        this.color = "red";

        break;

      case 2:
        this.type = "slow";
        this.points = 20;
        this.color = "blue";

        break;
    }
  }
};
