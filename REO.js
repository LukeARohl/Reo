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
var reo_image = new Image();
var reo_right = "./reo_right.png";
var reo_left = "./reo_left.png";
reo_image.src = "./reo_right.png";


this.key_down_event_handler = function(event) {
  switch(event.keyCode){
    case 65://left
      if(!reo.isColliding.left)
      {
        reo.input.left = true;
        reo_image.src = reo_left;
      }
      break;
    case 68://right
      if(!reo.isColliding.right)
      {
        reo.input.right = true;
        reo_image.src = reo_right;
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
      //starting zone
      new component(25,600,"white", -25,0,"platform"),
      new component(400,25,"white", -10,-10, "platform"),
      new component(25,600,"white",385,-610,"platform"),

      //rising jumps
      new component(200,25,"white", 100,300, "platform"),
      new component(200, 25, "white", 300,200,"platform"),
      new component(200,25,"white",500,100,"platform"),
      new component(30,30,"yellow", 700,300,"coin"),//coin at base of wall

      //wall
      new component(30,30,"yellow", 775,55,"coin"),//coin a top wall
      new component(100,300,"white",750,100 ,"platform"),

      new component(200,25,"white",790,350,"platform"),
      new component(200,25,"white", 1090,250,"platform"),
      new component(30,30,"yellow", 1150,200,"coin"),
      new component(300,25,"red",890,380,"enemy"),

      new component(300,25,"red",1290,380,"enemy"),
      new component(200,25,"white", 1390,325,"platform"),

      //top split
      new component(30,30,"yellow",1810,100,"coin"),
      new component(200,25,"white",1590,150,"platform"),
      new component(200,25,"white",1890,150,"platform"),
      new component(300,25,"red",1590,200,"enemy"),
      new component(300,25,"red",1890,200,"enemy"),

      //Bot split
      new component(25,50,"red",1790,350,"enemy"),
      new component(30,30,"yellow",1790,300,"coin"),
      new component(25,50,"white",1990,350,"platform"),
      new component(30,30,"yellow",1990,300,"coin"),

      //Final Hurdle
      new component(200,25,"white", 2350,350,"platform"),
      new component(30,30,"yellow",2600,150,"coin"),
      new component(25,150,"red",2600,250,"enemy"),
      new component(200,25,"white", 2650,200,"platform"),

      new component(30,30,"yellow",2950,350,"coin"), //pity coin
      new component(100,900,"purple", 3000,0,"end_zone")
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
                  document.removeEventListener('keydown', key_down_event_handler);
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
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};
