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
  this.speed = this.game.mode.SNAKE_SPEED;
  this.disease = false;

  this.setListeners();
}

Snake.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case KEY_RIGHT:
        if (this.direction === "LEFT") {
          if (this.game.mode.id === 1) {
          } else if (this.game.mode.id === 0) {
            this.game.gameOver();
          }
        } else {
          if (this.disease) this.direction = "LEFT";
          else this.direction = "RIGHT";
        }
        break;

      case KEY_DOWN:
        if (this.direction === "UP") {
          if (this.game.mode.id === 1) {
          } else if (this.game.mode.id === 0) {
            this.game.gameOver();
          }
        } else {
          if (this.disease) this.direction = "UP";
          else this.direction = "DOWN";
        }
        break;

      case KEY_UP:
        if (this.direction === "DOWN") {
          if (this.game.mode.id === 1) {
          } else if (this.game.mode.id === 0) {
            this.game.gameOver();
          }
        } else {
          if (this.disease) this.direction = "DOWN";
          else this.direction = "UP";
        }
        break;

      case KEY_LEFT:
        if (this.direction === "RIGHT") {
          if (this.game.mode.id === 1) {
          } else if (this.game.mode.id === 0) {
            this.game.gameOver();
          }
        } else {
          if (this.disease) this.direction = "RIGHT";
          else this.direction = "LEFT";
        }
        break;
    }
  }.bind(this);
};

Snake.prototype.draw = function() {
  for (var i = 0; i < this.length; i++) {
    this.game.ctx.fillStyle = this.game.mode.SNAKE_COLOR;
    this.game.ctx.fillRect(this.body[i].x, this.body[i].y, this.w, this.h);
  }
};

Snake.prototype.drawBackwards = function() {
  var toDraw = 0;

  setInterval(
    function() {
      this.game.clear();
      if (toDraw + 3 < this.body.length) {
        for (var i = 0; i < 3; i++) {
          this.game.ctx.fillRect(
            this.body[toDraw + i].x,
            this.body[toDraw + i].y,
            this.w,
            this.h
          );
        }
        toDraw++;
      } else {
        //resolviendo asincronia
        this.game.drawGameOver();
      }
    }.bind(this),
    40
  );
};

Snake.prototype.move = function() {
  this.collision();
  if (this.game.mode.id === 0) {
    this.infinitLimites();
  } else {
    this.borderCollision();
  }

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

Snake.prototype.borderCollision = function() {
  var control = true;
  switch (this.direction) {
    case "RIGHT":
      if (this.body[0].x + this.w > this.game.canvas.width - 20) {
        control = false;
      }
      break;

    case "LEFT":
      if (this.body[0].x - this.w < 0) {
        control = false;
      }
      break;

    case "UP":
      if (this.body[0].y - this.h < 0) {
        control = false;
      }
      break;

    case "DOWN":
      if (this.body[0].y + this.h > this.game.canvas.height - 20) {
        control = false;
      }
      break;
  }
  if (!control) this.game.gameOver();
};
