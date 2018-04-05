window.onload = function() {

  var canvas = document.getElementById("my-canvas");
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = "red";
  ctx.font = "50px 'Press Start 2P'";
  ctx.fillText("TO START PRESS P", 50, 50);


  document.onkeydown = function(event) {
    if(event.keyCode === 80){
    //  var globals = new gameType(0);
     var game = new Game("my-canvas");
     game.start();
    
  }else if(event.keyCode === 76){

  }
 }

};
