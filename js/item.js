function Item(game, type) {
  this.game = game;
  this.data = this.generate(type);
  this.w = this.data.w || 20;
  this.h = this.data.h || 20;
  this.type = this.data.type;
  this.points = this.data.points;
  this.color = this.data.color;
  this.code = this.data.code;

  this.generate(type);
  this.position();
}

Item.prototype.position = function() {
  var randomPosX =
    Math.ceil(Math.random() * (this.game.canvas.width / this.w)) * 20;
  var randomPosY =
    Math.ceil(Math.random() * (this.game.canvas.height / this.h)) * 20;

  var control;

  this.game.snake.body.forEach(function(e) {
    if (randomPosX === e.x || randomPosX >= this.game.canvas.width || randomPosX <=0 )
      { control = false} 
    else { control = true }

    if (randomPosY === e.y || randomPosY >= this.game.canvas.height || randomPosY <=0)
      { control = false} 
    else { control = true }
  }.bind(this));

  if (control) {
    debugger;
    this.x = randomPosX;
    this.y = randomPosY;
  } else {
    this.position();
  }
};

Item.prototype.draw = function(e) {
  if (this.game.mode.id === 0) {
    this.game.ctx.fillStyle = "rgba(0,0,0,0)";
    this.game.ctx.fillRect(e.x, e.y, e.w, e.h);
    this.game.ctx.fillStyle = e.color;
    this.game.ctx.font = "15px 'Press Start 2P'";
    this.game.ctx.fillText(e.code, e.x + e.h / 6, e.y + e.h);
    
  } else if (this.game.mode.id === 1) {
    this.game.ctx.fillStyle = e.color;
    this.game.ctx.fillRect(e.x, e.y, e.w/2, e.h/2);
  }
};

Item.prototype.generate = function(type) {
  if (typeof type == "string") {
    return this.game.mode.ITEM_NORMAL;
  } else {
    var random = Math.floor(Math.random() * 3);

    switch (random) {
      case 0:
        return this.game.mode.ITEM_DISEASE;
        break;

      case 1:
        return this.game.mode.ITEM_SPEEDUP;
        break;

      case 2:
        return this.game.mode.ITEM_SLOW;
        break;
    }
  }
};