var component_js = document.createElement('script');
component_js.src = 'Component.js';

var player_js = document.createElement('script');
player_js.src = 'Player.js';

document.getElementsByTagName("head")[0].appendChild(component_js);
document.getElementsByTagName("head")[0].appendChild(player_js);

var game_pieces;
var score;
var timer;
var reo;


document.addEventListener('keydown', function(event) {
  switch(event.keyCode){
    case 65://left
      reo.input.left = true;
      break;
    case 68://right
      reo.input.right = true;
      break;
    case 32://jump
      reo.input.jump = true;
      break;
    }
});
document.addEventListener('keyup',function(event) {
  switch(event.keyCode)
  {
    case 65://left
      reo.input.left = false;
      break;
    case 68://right
      reo.input.right = false;
      break;
    case 32://jump
      reo.input.jump = false;
      break;
    case 27://Escape
      alert("Escape");
      break;
  }
});

function start_game() {
  reo = new Player().reo_component;

  game_pieces = new Array(
      new component(200, 25, "white", 300,100,"platform")/*,
      new component(200,25,"white", 2500,150, "platform"),
      new component(200,25,"white", 100,300, "platform"),
      new component(200,25,"white", 25,10, "platform"),
      new component(20,250,"white", 500,150, "platform")*/
    );



  _2d_scroller.start();

  //display variables
  reo.update();
  for (var i = 0; i < game_pieces.length; i++) { //
    game_pieces[i].update();
  }

  //set timer function
  timer = setInterval(function()
          {
            _2d_scroller.clear();

            reo.update_pos();
            reo.update();

            for (var i = 0; i < game_pieces.length; i++) {
              //reo.check_crash(game_pieces[i]);
              game_pieces[i].movement.update_pos();
              game_pieces[i].update();
              if(game_pieces[i].check_crash(reo))
              {
                console.log("COLLISION");
              }
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
    //this.num_frames = 0;
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};
