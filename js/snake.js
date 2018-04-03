var KEY_LEFT = 65; //para mover a la izquierda => con la A
var KEY_RIGHT = 68; //para mover a la derecha (avanzar) => la D
var KEY_UP = 87; //para mover hacia arriba => la W
var KEY_DOWN = 83; //para ir hacia abajo => con la S

function Snake(game) {
  this.game = game;

  this.x = this.game.canvas.width / 2;
  this.y = this.game.canvas.height / 2;

  this.w = 20;
  this.h = 20;
  this.setListeners();

  this.body = [
    {
      x: this.x,
      y: this.y,
      nextPos: []
    },
    {
      x: this.x - this.w,
      y: this.y,
      nextPos: [this.x, this.y]
    },
    {
      x: this.x - this.w * 2,
      y: this.y,
      nextPos: [this.x - this.w, this.y]
    }
  ];
  this.direction = "RIGHT";

  this.speed = 100;

  this.disease = false;
}

Snake.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case KEY_RIGHT:
        if (this.direction === "LEFT") {
          //this.direction = "RIGHT";
          clearInterval(this.game.intervalId);
        }
        if (this.disease) {
          this.direction = "LEFT";
        } else {
          this.direction = "RIGHT";
        }

        break;

      case KEY_DOWN:
        if (this.disease === "UP") {
          //this.direction = "DOWN";
          clearInterval(this.game.intervalId);
        }
        if (this.disease) {
          this.direction = "UP";
        } else {
          this.direction = "DOWN";
        }

        break;

      case KEY_UP:
        if (this.direction === "DOWN") {
          // this.direction = "UP";
          clearInterval(this.game.intervalId);
        }

        if (this.disease) {
          this.direction = "DOWN";
        } else {
          this.direction = "UP";
        }
        break;

      case KEY_LEFT:
        if (this.direction === "RIGHT") {
          // this.direction = "LEFT";
          clearInterval(this.game.intervalId);
        }
        if (this.disease) {
          this.direction = "RIGHT";
        } else {
          this.direction = "LEFT";
        }
        break;
    }
  }.bind(this);
};

Snake.prototype.draw = function() {
  for (var i = 0; i < this.body.length; i++) {
    this.game.ctx.fillStyle = "black";
    this.game.ctx.fillRect(this.body[i].x, this.body[i].y, this.w, this.h);
  }
};

Snake.prototype.heredaMove = function(i) {
  this.body[i + 1].nextPos[0] = this.body[i].x;
  this.body[i + 1].nextPos[1] = this.body[i].y;
};

Snake.prototype.move = function() {
  for (var i = 0; i < this.body.length; i++) {
    if (i < this.body.length - 1) {
      this.heredaMove(i);
    }

    if (i > 0) {
      this.body[i].x = this.body[i].nextPos[0];
      this.body[i].y = this.body[i].nextPos[1];
    } else {
      this.collision();
      switch (this.direction) {
        case "RIGHT":
          this.body[0].x = this.body[0].x + this.w;
          if (this.body[0].x >= this.game.canvas.width - this.w)
            clearInterval(this.game.intervalId);

          break;

        case "UP":
          this.body[0].y = this.body[0].y - this.h;
          if (this.body[0].y < 1) clearInterval(this.game.intervalId);
          break;

        case "LEFT":
          this.body[0].x = this.body[0].x - this.w;
          if (this.body[0].x < 1) clearInterval(this.game.intervalId);

          break;

        case "DOWN":
          this.body[0].y = this.body[0].y + this.h;
          if (this.body[0].y >= this.game.canvas.height - this.h)
            clearInterval(this.game.intervalId);
      }
    }
  }
};

Snake.prototype.collision = function() {
  //colision consigo misma

  for (var i = 1; i < this.body.length; i++) {
    if (
      this.body[0].x < this.body[i].x + this.w &&
      this.body[0].x + this.w > this.body[i].x &&
      this.body[0].y < this.body[i].y + this.h &&
      this.body[0].y + this.h > this.body[i].y
    ) {
      console.log("HE COLISIONADO CONMIGO MISMA");
      clearInterval(this.game.intervalId);
    }
  }
};

Snake.prototype.grow = function() {
  switch (this.direction) {
    case "RIGHT":
      this.body.push({
        x: this.body[this.body.length - 1].x - this.w * this.body.length,
        y: this.body[this.body.length - 1].y,
        nextPos: [
          this.body[this.body.length - 1].x,
          this.body[this.body.length - 1].y
        ]
      });
      break;

    case "UP":
      this.body.push({
        x: this.body[this.body.length - 1].x,
        y: this.body[this.body.length - 1].y - this.h,

        nextPos: [
          this.body[this.body.length - 1].x,
          this.body[this.body.length - 1].y
        ]
      });

      break;

    case "LEFT":
      this.body.push({
        x: this.body[this.body.length - 1].x - this.w,
        y: this.body[this.body.length - 1].y,

        nextPos: [
          this.body[this.body.length - 1].x,
          this.body[this.body.length - 1].y
        ]
      });
      break;

    case "DOWN":
      this.body.push({
        x: this.body[this.body.length - 1].x,
        y: this.body[this.body.length - 1].y + this.h,
        nextPos: [
          this.body[this.body.length - 1].x,
          this.body[this.body.length - 1].y
        ]
      });
      break;
  }
};
