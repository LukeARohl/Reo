var component_js = document.createElement('script');
component_js.src = 'Component.js';

var player_js = document.createElement('script');
player_js.src = 'Player.js';

document.getElementsByTagName("head")[0].appendChild(component_js);
document.getElementsByTagName("head")[0].appendChild(player_js);

var game_pieces;
var scoreElement;
var scoreValue = 0;
var timer;
var reo;

this.key_down_event_handler = function(event) {
  switch(event.keyCode){
    case 65://left
      if(!reo.isColliding.left)
      {
        reo.input.left = true;
      }
      break;
    case 68://right
      if(!reo.isColliding.right)
      {
        reo.input.right = true;
      }
      break;
    case 32://jump
      reo.input.jump = true;
      break;
    }
};
document.addEventListener('keydown', key_down_event_handler);
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
  scoreElement = document.getElementById("score");
  scoreElement.innerHTML = "Score: " + 0;

  game_pieces = new Array(
      new component(200, 25, "white", 300,100,"platform"),
      new component(200,25,"white", 2500,150, "platform"),
      new component(200,25,"white", 100,300, "platform"),
      new component(200,25,"white", 25,10, "platform"),
      new component(20,250,"white", 500,150, "platform"),

      new component(30,30,"yellow", 300,300,"coin"),
      new component(30,30,"yellow", 550,300,"coin"),
      new component(30,30,"yellow", 700,300,"coin"),
      new component(30,30,"yellow", 850,300,"coin"),

      new component(50,30,"red",350,300,"enemy"),

      new component(100,900,"purple", 8000,0,"end_zone")

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

            var piece = null;

            reo.update_pos();
            for (i = 0; i < game_pieces.length; i++)
            {
              game_pieces[i].update_pos();
              if(game_pieces[i].check_crash(reo))
              {//Collision
                piece = game_pieces[i];
                console.log("COLLISION");
                if(piece.type == "coin")
                {
                  //remove coin
                  game_pieces.splice(i,1);
                  console.log(game_pieces.length);
                  //increment score
                  scoreValue += 5;
                  scoreElement.innerHTML = "Score: " + scoreValue;
                  //set piece back to null?
                  piece = null;
                } else if (piece.type == "enemy")
                {
                  console.log("collision w/ enemy");
                  document.removeEventListener('keydown', key_down_event_handler);
                  scoreElement.innerHTML = "Score " + scoreValue + "<br>Game Over";
                  timer = null;
                } else if (piece.type == "end_zone")
                {
                  timer = null;
                  console.log("End Zone Reached");
                  document.removeEventListener('keydown', function(){});
                  scoreElement.innerHTML = "Score " + scoreValue + "<br>You Win!";
                  piece = null;
                }

              }
            }

            //x collision handling
            if(piece != null)
            {
              if(!(reo.y + reo.height <= piece.y || reo.y >= piece.y + piece.height))
              {//!(if reo is above the piece or below the piece)
                console.log("Piece.x: " + piece.x + " Piece.type: " + piece.type + "\nReo.x: " + reo.x);
                console.log("Reo.x_Speed: " + reo.x_speed);

                if(reo.x + reo.width > piece.x && reo.x < piece.x)
                {//reo from the left
                  console.log("from the left");
                  reo.isColliding.right = true;
                  if(reo.x + reo.width == piece.x) {
                    reo.x_speed = 0;
                  } else {
                    reo.x_speed = reo.x + reo.width - piece.x;//positive x
                  }

                } else if (reo.x < piece.x + piece.width && reo.x + reo.width > piece.x + piece.width)
                {//reo from the right
                  reo.isColliding.left = true;
                  console.log("from the right");
                  if(reo.x == piece.x + piece.width)
                  {
                    reo.x_speed = 0;
                  } else {
                    reo.x_speed = reo.x - piece.x + piece.width;//negative x
                  }
                }
              }

              if(!(reo.x + reo.width <= piece.x || reo.x >= piece.x + piece.width) && !reo.isColliding.left && !reo.isColliding.right)
              {//!(if reo is to the left or reo is to the right)
                //y collision handling
                if(reo.y + reo.height > piece.y && reo.y < piece.y)
                {//reo colliding from top
                  reo.y = piece.y - reo.height;//negative y
                }
                else if(reo.y < piece.y + piece.height)
                {//reo colliding from bot
                  reo.y = piece.y + piece.height;//positive y
                }
              }

              for(i = 0; i < game_pieces.length; i++){
                game_pieces[i].update_pos();
                game_pieces[i].update();
              }
            } else
            { //for sure not colliding
              reo.isColliding.left = false;
              reo.isColliding.right = false;
              for(i = 0; i < game_pieces.length; i++)
              {
                game_pieces[i].update();
              }
            }


            reo.x_speed = 5;

            if(reo.y > _2d_scroller.height - reo.height)
            {
              reo.y = _2d_scroller.height - reo.height;
            }

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
