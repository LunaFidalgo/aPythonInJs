function Item(game, type) {
  this.game = game;

  this.w = 15;
  this.h = 15;

  this.generate(type);
  this.position();
}

Item.prototype.position = function() {
  var randomPosX = Math.floor(
    20 + Math.random() * (this.game.canvas.width - this.game.snake.w - 150)
  );
  var randomPosY = Math.floor(
    20 + Math.random() * (this.game.canvas.height - this.game.snake.h - 150)
  );

  var control;

  this.game.snake.body.forEach(function(e) {
    if (randomPosX === e.x) {
      control = false;
    } else {
      control = true;
    }

    if (randomPosY === e.y) {
      control = false;
    } else {
      control = true;
    }
  });
  if (control) {
    this.x = randomPosX;
    this.y = randomPosY;
  } else {
    this.position();
  }
};

Item.prototype.draw = function(e) {
  debugger;
  //this.game.ctx.fillStyle = "#c92323";
  this.game.ctx.fillStyle = "rgba(0,0,0,0)";
  this.game.ctx.fillRect(e.x, e.y, e.w, e.h);
  this.game.ctx.fillStyle = e.color;
  this.game.ctx.font = "15px 'Press Start 2P'";
  this.game.ctx.fillText(e.code, e.x + e.h / 6, e.y + e.h);
};

Item.prototype.generate = function(type) {
  console.log(typeof type);
  if (typeof type == "string") {
    this.type = "normal";
    this.points = 10;
    this.color = "#fd5f00";
    this.code = "$";
  } else {
    var random = Math.floor(Math.random() * 3);
    switch (random) {
      case 0:
        this.type = "disease";
        this.points = 100;
        this.color = "yellow";
        this.code = "NaN";
        this.w = 48;
        this.h = 20;
        break;

      case 1:
        this.type = "speed-up";
        this.points = 30;
        this.color = "#ef1fad";
        this.code = "1";
        break;

      case 2:
        this.type = "slow";
        this.points = 20;
        this.color = "#1f45ef";
        this.code = "0";
        break;
    }
  }
};
