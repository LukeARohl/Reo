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

    this.x_speed = x;

    this.update = function()
    {
      var ctx = _2d_scroller.canvas.getContext("2d");
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    };

    this.check_crash = function(check)
    {
      //console.log(check);
      var left = x;
      var right = x + width;
      var top = y;
      var bottom = y + height;
      var check_left = check.x;
      var check_right = check.x + check.width;
      var check_top = check.y;
      var check_bottom = check.y + check.height;
      var crash = true;
      /*
      if ((bottom < check_top) || (top > check_bottom)
          || (right < check_left) || (left > check_right)) {
        crash = false;
      }
      */
      if((top < check_bottom && bottom > check_top)
            && (right > check_left && left < check_right))
      {
        console.log("Reo is colliding");
        check.y_speed = 0;
      } else
      {
        check.y_speed = 15;
      }
      return crash;
    };

    this.movement = {
      update_pos : function()
      {
          this.x_speed = 5;

          if(reo.input.left)
          {
            x += this.x_speed;
          } else if (reo.input.right)
          {
            x -= this.x_speed;
          }
      },
    };
  }
}
