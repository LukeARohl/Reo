var reo;
var x_speed = 15;
class Player {
  constructor(){
    this.reo_component = new component(50, 50, "red", 100, 100, "player");

    this.reo_component.turns_jumping = 0;

    this.reo_component.gravity = 1;
    this.reo_component.gravity_speed = 1;
    this.reo_component.y_speed = 3;


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

    this.reo_component.update_pos = function(amount_y)
    {//TODO
      reo.speed_y = amount_y;

      if(reo.speed_y < 0)//landed on top of something
      {
        //not jumping
        this.reo_component.isJumping = false;

      } else if(reo.speed > 0)//hit something from below
      {
        //could be jumping

      } else //already against something
      {
        //not jumping
        this.reo_component.isJumping = false;
      }

      if(reo.input.jump)
      {
        reo.y -= reo.y_speed;
      } else
      {
        reo.y += reo.y_speed;
        if(reo.y >= _2d_scroller.canvas.height - reo.height)
        {
          reo.y = _2d_scroller.canvas.height - reo.height;
        }
      }
      return;
    }




  }
}
