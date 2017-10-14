var reo;

class Player {
  constructor(){
    this.reo_component = new component(49, 49, "gray", 100, 100, "player");

    this.reo_component.turns_jumping = 0;

    this.reo_component.gravity = 1;
    this.reo_component.gravity_speed = 1;
    this.reo_component.y_speed = 10;
    this.reo_component.x_speed = 5;
    this.reo_component.isColliding = {
      top : false,
      bot : false,
      left : false,
      right : false
    };

    this.reo_component.input = {
      left: false,
      right: false,
      jump: false
    };

    this.reo_component.update = function()
    {
      var ctx = _2d_scroller.canvas.getContext("2d");
      ctx.fillStyle = reo.color;
      ctx.fillRect(reo.x, reo.y, reo.width, reo.height);
    };

    this.reo_component.update_pos = function()
    {

      if(reo.input.jump)
      {
        reo.y -= reo.y_speed;
        if(reo.y <= 0)
        {
          reo.y = 0;
        }
      } else
      {
        reo.y += reo.y_speed;
        if(reo.y >= _2d_scroller.canvas.height - reo.height)
        {
          reo.y = _2d_scroller.canvas.height - reo.height;
        }

      }
      return;
    };
  }
}
