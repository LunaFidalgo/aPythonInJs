function Item(game) {
this.game = game;
this.x = 40; 
this.y = 40; 
this.w = 5;
this.h = 5;
}

Item.prototype.draw = function() {
  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
};