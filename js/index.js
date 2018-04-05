window.onload = function() {
  var canvas = document.getElementById("my-canvas");

  landingPage(canvas);

  document.onkeydown = function(event) {
    if (event.keyCode === 80) {
      var globals = new Mode(0);

      var game = new Game("my-canvas", globals);
      game.start();
    } else if (event.keyCode === 76) {
      var globals = new Mode(1);

      var game = new Game("my-canvas", globals);
      game.start();
    }
  };
};

function landingPage(MyCanvas) {
  var ctx = MyCanvas.getContext("2d");

  ctx.fillStyle = "red";
  ctx.font = "40px 'Press Start 2P'";
  ctx.fillText("SNAKE", 20, MyCanvas.height / 2);
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillText("Controls: ", 20,  MyCanvas.height / 2+30)
  ctx.fillText("A: ", 20,  MyCanvas.height / 2+30)



}
