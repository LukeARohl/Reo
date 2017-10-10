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

//TODO 
var DEFAULT_X = 0;
var DEFAULT_Y = 15;


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
      new component(200, 25, "white", 300,200,"platform")/*,
      new component(200,25,"white", 2500,150, "platform"),
      new component(200,25,"white", 100,300, "platform"),
      new component(200,25,"white", 25,10, "platform")*/,
      new component(20,250,"white", 500,150, "platform")
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
            _2d_scroller.clear();//clear map

            var crash = false;
            var piece = null;
            for(var i = 0; i<game_pieces.length; i++)
            {
              //check every piece against reo for crash
              if(game_pieces[i].check_crash(reo))
              {
                crash =  true;
                x_speed = 0;
                piece = game_pieces[i];
                break;
              }

            }

            if(!crash)//no crash
            {
              //update everything
              for ( i = 0; i < game_pieces.length; i++) {

                    game_pieces[i].movement.update_pos(DEFAULT_X);
                    reo.update_pos(DEFAULT_Y);
                }

            } else {//crash
              //Determine x distance
              if(piece.x < reo.x)
                {speed_x = reo.x - piece.x + piece.width;} //negative x
              else if(reo.x + reo.width > piece.x + piece.widh) //
                {speed_x = piece.x + piece.width - reo.x;} //positive x

              //Move all pieces that amount of x
              for ( i = 0; i < game_pieces.length; i++)
              {
                game_pieces[i].movement.update_pos(speed_x);
                game_pieces[i].update();
              }
            }

            //set Reo position
              //Determine y distance
              //Move Reo that amount of y
              if(reo.y > piece.y)
                {speed_y = (piece.y + piece.height) - (reo.y + reo.height);}//positive y
              else if(reo.y + reo.height < piece.y + piece.height)
                {speed_y = reo.y - piece.y + piece.height;}//negative y


              reo.update_pos(speed_y);
              reo.update();
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


{

}
