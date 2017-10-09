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
          //return;
          if (x <= 1) {
            x = 1;
            this.x_speed = 0; //Potentially a problem, might get stuck when touching wall.
          } else if (x >= _2d_scroller.canvas.width - reo.width)
          {
            x = _2d_scroller.canvas.width - reo.width;
            this.x_speed = 0;
          }
        },

        check_crash : function(check) {
          console.log(check);
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
