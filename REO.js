var component_js = document.createElement('script');
component_js.src = 'Component.js';

var player_js = document.createElement('script');
player_js.src = 'Player.js';

document.getElementsByTagName("head")[0].appendChild(component_js);
document.getElementsByTagName("head")[0].appendChild(player_js);

var game_pieces;
var previous_pieces;
var scoreElement;
var scoreValue = 0;
var timer;
var reo;
var last_reo;
var last_collision;

this.key_down_event_handler = function(event) {
  switch(event.keyCode){
    case 37:
    case 65://left
      if(!reo.isColliding.left)
      {
        reo.input.left = true;
      }
      break;
    case 68:
    case 39://right
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
    case 37:
    case 65://left
      reo.input.left = false;
      break;

    case 39:
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

    previous_pieces = []


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
              previous_pieces[i] = game_pieces[i];
              game_pieces[i].update_pos();
              if(game_pieces[i].check_crash(reo))
              {//Collision
                var last_piece = piece;
                piece = game_pieces[i];
                last_collision = previous_pieces[i];
                console.log("COLLISION");
                /* INSERTED BELOW */







                /*  INSERTED ABOVE */
                if(piece.type == "coin")
                {
                  //remove coin
                  game_pieces.splice(i,1);
                  console.log(game_pieces.length);
                  //increment score
                  scoreValue += 5;
                  scoreElement.innerHTML = "Score: " + scoreValue;
                  //set piece back to null?
                  piece = last_piece;
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
                  scoreElement.innerHTML = "Score " + scoreValue + "<br>Game Over";
                  alert("You Win!");
                }

              }
            }
            /* TAKEN FROM HERE*/


            //x collision handling
            if(piece != null)
            {
              var x_collision = false;
              //If REO was prevously to the left or right of the piece.
              if(((last_reo.x + last_reo.width <= last_collision.x) || (last_reo.x <= last_collision.x + last_collision.width))  && ((reo.y + reo.height > piece.y) || (reo.y < piece.y + piece.height)))
              {//!(if reo is above the piece or below the piece)


                console.log("Piece.x: " + piece.x + " Piece.type: " + piece.type + "\nReo.x: " + reo.x);
                console.log("Reo.x_Speed: " + reo.x_speed);

                if(reo.x + reo.width >= piece.x && reo.x < piece.x)
                {//reo from the left
                  console.log("from the left");

                  x_collision = true;
                  reo.isColliding.right = true;
                  //Set reo.x_speed to the difference of reos
                    reo.x_speed = reo.x + reo.width - piece.x;//positive x

                } else if (reo.x < piece.x + piece.width && reo.x + reo.width > piece.x + piece.width  && ((reo.y + reo.height >= piece.y) || (reo.y <= piece.y + piece.height)))
                {//reo from the right
                  reo.isColliding.left = true;
                  console.log("from the right");

                    reo.x_speed = reo.x - piece.x + piece.width;//negative x
                    x_collision = true;

                }

                for(i = 0; i < game_pieces.length ; i++){
                  game_pieces[i].update_pos();
                  game_pieces[i].update();
                }
              }

              //If REO was previously above or below the piece.
              if(((last_reo.y + last_reo.height <= piece.y) || (last_reo.y <= piece.y + piece.height))  && ((reo.x + reo.width > last_collision.x) || (reo.x < last_collision.x + last_collision.width)))
              {//!(if reo is to the left or reo is to the right)


                //y collision handling
                if((reo.y + reo.height > piece.y && reo.y < piece.y) && ( (reo.x + reo.width > piece.x) || (reo.x < piece.x + piece.width) ))
                {//reo colliding from top
                  reo.y = piece.y - reo.height;//negative y
                  if(reo.y <= 0)
                  {
                    reo.y = 0;
                  }
                  console.log("TOP Collision");
                }
                else if((reo.y < piece.y + piece.height && reo.y + reo.height > piece.y + piece.height) && ( (reo.x + reo.width > piece.x) || (reo.x < piece.x + piece.width) ))
                {//reo colliding from bot
                  reo.y = piece.y + piece.height;//positive y
                  if(reo.y >= _2d_scroller.canvas.height - reo.height)
                  {
                    reo.y = _2d_scroller.canvas.height - reo.height;
                  }

                  console.log("BOTTOM Collision");
                }

                for(i = 0; i < game_pieces.length && !x_collision; i++){
                  game_pieces[i].update();
                }
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

            /* TAKEN FROM HERE */
            reo.x_speed = 5;
            last_reo = reo;
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
