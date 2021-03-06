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
var can_jump = true;
var jumps = 0;

var reo;
var reo_image = new Image();
var reo_right = "./reo_right.png";
var reo_left = "./reo_left.png";
reo_image.src = "./reo_right.png";


this.key_down_event_handler = function(event) {
  switch (event.keyCode) {
    case 37:
    case 65: //left
      if (!reo.isColliding.left) {
        reo.input.left = true;
        reo_image.src = reo_left;
      }
      break;
    case 68:
    case 39: //right
      if (!reo.isColliding.right) {
        reo.input.right = true;
        reo_image.src = reo_right;
      }
      break;
    case 32: //jump
    if(reo.input.jump == false && can_jump)
    {
      reo.input.jump = true;
    }
    /*if(can_jump)
    {
      jumps++;
      if(jumps > 2)
      {
        can_jump = false;
        reo.input.jump = false;
      }
    }*/
      break;
  }
};
document.addEventListener('keydown', key_down_event_handler);
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 37:
    case 65: //left
      reo.input.left = false;
      break;

    case 39:
    case 68: //right
      reo.input.right = false;
      break;
    case 32: //jump
      //reo.input.jump = false;
      break;
    case 27: //Escape
      alert("Escape");
      break;
  }
});

function start_game() {
  reo = new Player().reo_component;
  scoreElement = document.getElementById("score");
  scoreElement.innerHTML = "Score: " + 0;
  var last_reo = reo;
  var frames_jumping = 0;
  reo.input.jump = false;
  var falling = false;
  var frames_falling = 0;

  game_pieces = new Array(
    //starting zone
    new component(25, 600, "white", -25, 0, "platform"),
    new component(400, 25, "white", -10, -10, "platform"),
    new component(25, 600, "white", 385, -610, "platform"),

    //rising jumps
    new component(200, 25, "white", 100, 300, "platform"),
    new component(200, 25, "white", 300, 200, "platform"),
    new component(200, 25, "white", 500, 100, "platform"),
    new component(30, 30, "yellow", 700, 300, "coin"), //coin at base of wall

    //wall
    new component(30, 30, "yellow", 775, 55, "coin"), //coin a top wall
    new component(100, 300, "white", 750, 100, "platform"),

    new component(200, 25, "white", 790, 350, "platform"),
    new component(200, 25, "white", 1090, 250, "platform"),
    new component(30, 30, "yellow", 1150, 200, "coin"),
    new component(300, 25, "red", 890, 380, "enemy"),

    new component(300, 25, "red", 1290, 380, "enemy"),
    new component(200, 25, "white", 1390, 325, "platform"),

    //top split
    new component(30, 30, "yellow", 1810, 100, "coin"),
    new component(200, 25, "white", 1590, 150, "platform"),
    new component(200, 25, "white", 1890, 150, "platform"),
    new component(300, 25, "red", 1590, 200, "enemy"),
    new component(300, 25, "red", 1890, 200, "enemy"),

    //Bot split
    new component(25, 50, "red", 1790, 350, "enemy"),
    new component(30, 30, "yellow", 1790, 300, "coin"),
    new component(25, 50, "white", 1990, 350, "platform"),
    new component(30, 30, "yellow", 1990, 300, "coin"),

    //Final Hurdle
    new component(200, 25, "white", 2350, 350, "platform"),
    new component(30, 30, "yellow", 2600, 150, "coin"),
    new component(25, 150, "red", 2600, 250, "enemy"),
    new component(200, 25, "white", 2650, 200, "platform"),

    new component(30, 30, "yellow", 2950, 350, "coin"), //pity coin
    new component(100, 900, "purple", 3000, 0, "end_zone")
  );

  previous_pieces = []


  _2d_scroller.start();

  //display variables
  reo.update();
  for (var i = 0; i < game_pieces.length; i++) { //
    game_pieces[i].update();
  }

  //set timer function
  timer = setInterval(function() {
    _2d_scroller.clear();

    var piece = null;

    if(reo.input.jump == true)
    {
      frames_jumping++;
      frames_falling = 0;
      if(frames_jumping >= 10)
      {
        reo.input.jump = false;
        frames_jumping = 0;
        falling = true;
        frames_falling = 0;
      }
    }
    if(falling)
    {
      frames_falling++;
      if(frames_falling >= 8)
      {
        can_jump = true;
      }
    }
    reo.update_pos();
    for (i = 0; i < game_pieces.length; i++) {
      previous_pieces[i] = game_pieces[i];
      game_pieces[i].update_pos();
      if (game_pieces[i].check_crash(reo)) { //Collision
        var last_piece = piece;
        piece = game_pieces[i];
        last_collision = previous_pieces[i];
        console.log("COLLISION");
        /* INSERTED BELOW */







        /*  INSERTED ABOVE */
        if (piece.type == "coin") {
          //remove coin
          game_pieces.splice(i, 1);
          console.log(game_pieces.length);
          //increment score
          scoreValue += 5;
          scoreElement.innerHTML = "Score: " + scoreValue;
          //set piece back to null?
          piece = last_piece;
        } else if (piece.type == "enemy") {
          console.log("collision w/ enemy");
          document.removeEventListener('keydown', key_down_event_handler);
          scoreElement.innerHTML = "Score " + scoreValue + "<br>Game Over";
          timer = null;
          reo.input.left = false;
          reo.input.right = false;
          reo.input.jump = false;
        } else if (piece.type == "end_zone") {
          timer = null;
          console.log("End Zone Reached");
          document.removeEventListener('keydown', key_down_event_handler);
          scoreElement.innerHTML = "Score " + scoreValue + "<br>You Win!";
          piece = null;
        }

      }
    }
    /* TAKEN FROM HERE*/

    if(last_reo.y == reo.y && last_reo != null)
    {
      jumps = 0;
    }

    //x collision handling
    if (piece != null) {
      var x_collision = false;
      var y_collision = false;

      //If REO was previously above or below the piece.
      if (((last_reo.y + last_reo.height <= piece.y) || (last_reo.y <= piece.y + piece.height)) && ((reo.x + reo.width > last_collision.x) || (reo.x < last_collision.x + last_collision.width))) { //!(if reo is to the left or reo is to the right)


        //y collision handling
        if ((reo.y + reo.height > piece.y && reo.y < piece.y) && ((reo.x + reo.width > piece.x) || (reo.x < piece.x + piece.width))) { //reo colliding from top
          reo.y = piece.y - reo.height; //negative y
          if (reo.y <= 0) {
            reo.y = 0;
          }
          y_collision = true;
          jumps = 0;
          console.log("TOP Collision");
        } else if ((reo.y < piece.y + piece.height && reo.y + reo.height > piece.y + piece.height) && ((reo.x + reo.width > piece.x) || (reo.x < piece.x + piece.width))) { //reo colliding from bot
          reo.y = piece.y + piece.height; //positive y
          if (reo.y >= _2d_scroller.canvas.height - reo.height) {
            reo.y = _2d_scroller.canvas.height - reo.height;
          }
          y_collision = true;
          console.log("BOTTOM Collision");
        }

      }


      //If REO was prevously to the left or right of the piece.
      if (((last_reo.x + last_reo.width <= last_collision.x) || (last_reo.x <= last_collision.x + last_collision.width)) && ((last_reo.y + last_reo.height > last_collision.y) || (last_reo.y < last_collision.y + last_collision.height)) && !y_collision) { //!(if reo is above the piece or below the piece)


        console.log("Piece.x: " + piece.x + " Piece.type: " + piece.type + "\nReo.x: " + reo.x);
        console.log("Reo.x_Speed: " + reo.x_speed);

        if (reo.x + reo.width >= piece.x && reo.x < piece.x) { //reo from the left
          console.log("from the left");

          x_collision = true;
          reo.isColliding.right = true;
          //Set reo.x_speed to the difference of reos
          reo.x_speed = reo.x + reo.width - piece.x; //positive x



        } else if (reo.x < piece.x + piece.width && reo.x + reo.width > piece.x + piece.width && ((reo.y + reo.height >= piece.y) || (reo.y <= piece.y + piece.height))) { //reo from the right
          reo.isColliding.left = true;
          console.log("from the right");

          reo.x_speed = reo.x - piece.x + piece.width; //negative x
          x_collision = true;


        }

        for (i = 0; i < game_pieces.length; i++) {
          game_pieces[i].update_pos();
        }
      }



      reo.update();
    for (i = 0; i < game_pieces.length; i++) {
      game_pieces[i].update();
    }

    } else { //for sure not colliding
      reo.isColliding.left = false;
      reo.isColliding.right = false;

      reo.update();
      for (i = 0; i < game_pieces.length; i++) {
        game_pieces[i].update();
      }
    }

    /* TAKEN FROM HERE */
    reo.x_speed = 5;
    last_reo = reo;
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
