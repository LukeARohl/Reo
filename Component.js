class component {
  constructor(width, height, color, x, y, type)
  {
    this.x = x;
    this.y = y;

    this.color = color;
    this.type = type;

    this.width = width;
    this.height = height;



    this.update = function()
    {
      var ctx = _2d_scroller.canvas.getContext("2d");
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.check_crash = function(check)
    {
      //console.log(check);
      var left = this.x;
      var right = this.x + this.width;
      var top = this.y;
      var bottom = this.y + this.height;
      var check_left = check.x;
      var check_right = check.x + check.width;
      var check_top = check.y;
      var check_bottom = check.y + check.height;
      var crash = false;
      /*
      if ((bottom < check_top) || (top > check_bottom)
          || (right < check_left) || (left > check_right)) {
        crash = false;
      }
      */
      if((top < check_bottom && bottom > check_top)
            && (right > check_left && left < check_right))
      {
        crash = true;
      }

      return crash;
    };

    this.update_pos = function()
    {
        if(reo.input.left && !reo.isColliding.left)
        {
          this.x += reo.x_speed;
        } else if (reo.input.right && !reo.isColliding.right)
        {
          this.x -= reo.x_speed;
        }
    };
  }
}
