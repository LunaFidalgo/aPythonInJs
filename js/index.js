window.onload = function() {
  var canvas = document.getElementById("my-canvas");

  landingPage(canvas);

  document.onkeydown = function(event) {
    if (event.keyCode === 80) {
      var globals = new Mode(0);
      canvas.className = "mode0";
      var game = new Game("my-canvas", globals);
      game.start();
    } else if (event.keyCode === 76) {
      var globals = new Mode(1);
      canvas.className = "mode1";
      var game = new Game("my-canvas", globals);
      game.start();
    }
  };
};

function landingPage(MyCanvas) {
  var ctx = MyCanvas.getContext("2d");

  ctx.fillStyle = "#1fef61";
  ctx.font = "40px 'Press Start 2P'";
  ctx.fillText("a PYTHON in JS", 200, 80);
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillText("Controls ", 50, 150);

  var img = new Image();
  img.src = "images/awsd.jpg";
  img.onload = function() {
    ctx.drawImage(img, 50, 200, 150, 150);
  };

  ctx.fillText("FREAK MODE", 400, 150);
  ctx.fillText("PRESS P ", 400, 300);

  ctx.fillText("NORMAL MODE", 700, 150);
  ctx.fillText("PRESS L ", 700, 300);

}
