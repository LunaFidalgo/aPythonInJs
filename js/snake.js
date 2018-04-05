function Snake(game) {
  this.game = game;

  this.x = this.game.canvas.width / 2;
  this.y = this.game.canvas.height / 2;

  this.w = 20;
  this.h = 20;

  this.body = [
    { x: this.x, y: this.y },
    { x: this.x - this.w, y: this.y },
    { x: this.x - this.w * 2, y: this.y }
  ];
  this.length = 3;

  this.direction = "RIGHT";
  this.speed = SNAKE_SPEED;
  this.disease = false;

  this.setListeners();
}

Snake.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case KEY_RIGHT:
        if (this.direction === "LEFT") {
          //this.direction = "RIGHT";
          this.game.gameOver();
        }
        if (this.disease) this.direction = "LEFT";
        else this.direction = "RIGHT";
        break;

      case KEY_DOWN:
        if (this.direction === "UP") {
          //this.direction = "DOWN";
          this.game.gameOver();
        }
        if (this.disease) this.direction = "UP";
        else this.direction = "DOWN";
        break;

      case KEY_UP:
        if (this.direction === "DOWN") {
          // this.direction = "UP";
          this.game.gameOver();
        }

        if (this.disease) this.direction = "DOWN";
        else this.direction = "UP";
        break;

      case KEY_LEFT:
        if (this.direction === "RIGHT") {
          // this.direction = "LEFT";
          this.game.gameOver();
        }
        if (this.disease) this.direction = "RIGHT";
        else this.direction = "LEFT";
        break;
    }
  }.bind(this);
};

Snake.prototype.draw = function() {
  for (var i = 0; i < this.length; i++) {
    this.game.ctx.fillStyle = SNAKE_COLOR;
    this.game.ctx.fillRect(this.body[i].x, this.body[i].y, this.w, this.h);
  }
};

Snake.prototype.drawBackwards = function() {
  for (var i = 0; i < this.body.length - 1; i += 3) {
    for (var j = 0; j < 3 - 1; j++) {
      this.game.ctx.fillStyle = "#1fef61";
      this.game.ctx.fillRect(
        this.body[i + j].x,
        this.body[i + j].y,
        this.w,
        this.h
      );
      debugger;
      this.body.unshift();
    }

    // this.game.clear();
  }
};

Snake.prototype.move = function() {
  this.collision();
  this.infinitLimites(this.direction);
  switch (this.direction) {
    case "RIGHT":
      newMove = { x: this.body[0].x + this.w, y: this.body[0].y };
      break;

    case "UP":
      newMove = { x: this.body[0].x, y: this.body[0].y - this.h };
      break;

    case "LEFT":
      newMove = { x: this.body[0].x - this.w, y: this.body[0].y };
      break;

    case "DOWN":
      newMove = { x: this.body[0].x, y: this.body[0].y + this.h };
      break;
  }
  this.body.unshift(newMove);
};

Snake.prototype.collision = function() {
  for (var i = 1; i < this.length; i++) {
    if (
      this.body[0].x < this.body[i].x + this.w &&
      this.body[0].x + this.w > this.body[i].x &&
      this.body[0].y < this.body[i].y + this.h &&
      this.body[0].y + this.h > this.body[i].y
    ) {
      this.game.gameOver();
    }
  }
};

Snake.prototype.grow = function() {
  this.length++;
};

Snake.prototype.infinitLimites = function() {
  switch (this.direction) {
    case "RIGHT":
      if (this.body[0].x + this.w > this.game.canvas.width) {
        this.body[0].x = 0;
      }
      break;
    case "LEFT":
      if (this.body[0].x - this.w < -20) {
        this.body[0].x = this.game.canvas.width;
      }
      break;

    case "UP":
      if (this.body[0].y - this.h < -20) {
        this.body[0].y = this.game.canvas.height;
      }
      break;

    case "DOWN":
      if (this.body[0].y + this.h > this.game.canvas.height) {
        this.body[0].y = 0;
      }
      break;
  }
};
