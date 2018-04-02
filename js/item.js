function Item(game,type) {
  this.game = game;
  this.x = Math.floor(
    Math.random() * (this.game.canvas.width - this.game.snake.w - 100)
  );
  this.y = Math.floor(
    Math.random() * (this.game.canvas.height - this.game.snake.h - 100)
  );
  this.w = 8;
  this.h = 8;
  this.type =type; //this.type = "slow"
}


Item.prototype.draw = function() {
  
  switch (this.type) {
    case "speed-up":
      this.game.ctx.fillStyle = "red";
      break;

    case "slow":
      this.game.ctx.fillStyle = "green";
      break;

    case "normal":
      this.game.ctx.fillStyle = "normal"; 
      break;

      case "desease": 
      this.game.ctx.fillStyle = "blue";
      break; 
  }

  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
};

//TIPOS DE ITEMS:
// rojo: acelera
// verde: frena
//negro: normal
