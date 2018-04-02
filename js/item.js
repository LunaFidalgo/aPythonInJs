function Item(game) {
  this.game = game;
  this.x = Math.floor(
    Math.random() * (this.game.canvas.width - this.game.snake.w - 100)
  );
  this.y = Math.floor(
    Math.random() * (this.game.canvas.height - this.game.snake.h - 100)
  );
  this.w = 8;
  this.h = 8;
}

Item.prototype.draw = function() {
  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
};
