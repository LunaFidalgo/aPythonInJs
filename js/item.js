function Item(game) {
this.game = game;
this.x = this.game.canvas.width / 2 + 50; 
this.y = this.game.canvas.height / 2 ; 
this.w = 5;
this.h = 5;
}

Item.prototype.draw = function() {
  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
};