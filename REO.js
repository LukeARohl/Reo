var reo;
var game_pieces = [];
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

  _2d_scroller.start();
  //reo.movement.update_pos();
  reo.movement.update();
  timer = setInterval(function()
          {
            _2d_scroller.clear()
            reo.movement.update_pos();
            reo.movement.update();
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

class component {
  constructor(width, height, color, x, y, type)
  {
    this.score = 0;

    this.x = x;
    this.y = y;

    this.color = color;
    this.type = type;

    this.width = width;
    this.height = height;

    this.x_speed = 0;
    this.y_speed = 0;

    this.gravity = 1;
    this.gravity_speed = 0;

    this.movement = {
      update : function()
      {

        var ctx = _2d_scroller.canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
      },
      update_pos : function()
      {
          //reo.gravity_speed += reo.gravity;
          x += reo.x_speed;
          reo.y_speed += reo.gravity;
          y += reo.y_speed;
          this.check_stops();//Reo only
      },
      check_stops : function() {
          var bottom = _2d_scroller.canvas.height - height;
          if (y > bottom) {
            y = bottom;
            this.gravity_speed = 0;
          }
          return;
          if (x <= 1) {
            x = 1;
            this.x_speed = 0; //Potentially a problem, might get stuck when touching wall.
          } else if (x >= _2d_scroller.canvas.width - reo.width)
          {
            x = reo.canvas.width - reo.width;
            this.x_speed = 0;
          }
        },

        check_crash : function(check) {
          var left = x;
          var right = x + width;
          var top = y;
          var bottom = y + height;
          var check_left = check.x;
          var check_right = check.x + check.width;
          var check_top = check.y;
          var check_bottom = check.y + check.height;
          var crash = true;
          if ((bottom < check_top) || (top > check_bottom)
              || (right < check_left) || (left > check_right)) {
            crash = false;
          }
          return crash;
        }
    };

    if (this.type == "player") {
      this.input = {
        left: false,
        right: false,
        jump: false
      };
      this.update_pos = function()
      {

      };
      this.isJumping = false;

    }
  }
}

function update_game() {
  var x = 0;

}

function move() {

}
