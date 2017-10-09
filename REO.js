var x = document.createElement('script');
x.src = 'Component.js';
document.getElementsByTagName("head")[0].appendChild(x);

var reo;
var game_pieces;
var score;
var timer;



document.addEventListener('keydown', function(event) {
  switch(event.keyCode){
    case 65://left
      reo.x_speed = -5;
      break;
    case 68://right
      reo.x_speed = 5;
      break;
    case 32://jump
      reo.y_speed = -15;
      break;
    }
});
document.addEventListener('keyup',function(event) {
  switch(event.keyCode)
  {
    case 65://left
      reo.x_speed = 0;
      break;
    case 68://right
      reo.x_speed = 0;
      break;
    case 32://jump
      reo.y_speed = 0;
      break;
    case 27://Escape
      alert("Escape");
      break;
  }
});

function start_game() {
  reo = new component(50, 50, "red", 100, 100, "player");
  game_pieces = new Array(new component(200, 25, "white", 200,100,"platform"));



  _2d_scroller.start();
  //reo.movement.update_pos();
  reo.movement.update();
  for (var i = 0; i < game_pieces.length; i++) {
    game_pieces[i].movement.update();
  }
  timer = setInterval(function()
          {
            _2d_scroller.clear()
            reo.movement.update_pos();
            reo.movement.update();

            for (var i = 0; i < game_pieces.length; i++) {
              game_pieces[i].movement.update();
            }
          }, 20);
}

var _2d_scroller = {
  canvas: document.getElementById("game_canvas"),
  start: function() {
    var canvas = document.getElementById("game_canvas");
    canvas.width = 600;
    canvas.height = 400;
    this.context = canvas.getContext("2d");
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    this.num_frames = 0;
    this.interval = setInterval(update_game(), 16);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};


function update_game() {
  var x = 0;

}

function move() {

}
