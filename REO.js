
var reo;
var game_pieces = [];
var score;

function start_game() {
  reo = new component(30, 30, "reo", 5, 570, "player");
  reo.gravity = 0;
  GamePad.start();
}

var GamePad =
{
  this.canvas = document.createElement("canvas"),
  start : function()
    {
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.num_frames = 0;
    this.interval = setInterval(updateGame(), 16);
    },
  clear : function()
    {
      this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
};

var component(width, height, color, x, y, type)
{
  this.type = type;
  this.score = 0;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
  this.gravity = 0;
  this.gravity_speed = 0;
  if(this.type == "player")
  {
    this.input = {left: false, right:false, jump:false};
  }
  this.update = function()
    {
      ctx = GamePad.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };
  this.update_pos = function()
    {
      this.gravity_speed += this.gravity;
      this.x += this.x_speed;
      this.y += this.y_speed + this.gravity_speed;
      this.check_stops();
    };
  this.check_stops = function()
    {
      var bottom = GamePad.canvas.height - this.height;
      if(this.y> bottom)
      {
        this.y = bottom;
        this.gravity_speed = 0;
      }

      if(this.x <= 5)
      {
        this.x = 5;
        this.x_speed = 0; //Potentially a problem, might get stuck when touching wall.
      }
    };
    this.check_crash = function(check)
      {
        var left = this.x;
        var right = this.x + this.width;
        var top = this.y;
        var bottom = this.y + this.height;
        var check_left = check.x;
        var check_right = check.x + check.width;
        var check_top = check.y;
        var check_bottom = check.y + check.height;
        var crash = true;
        if((bottom < check_top) || (top > check_bottom) || (right < check_left) || (left > check_right) )
        {
          crash = false;
        }
        return crash;
      };
}

function update_GamePad()
{
  var x;

}

function move()
{

}
