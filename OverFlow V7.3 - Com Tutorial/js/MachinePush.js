class MachinePush{
   constructor(x,y,scale){
      
      var options = {
         isStatic: true,
      }

      this.ww = windowWidth;
      this.wh = windowHeight;
      this.x = x;
      this.y = y;
      this.w = 400;
      this.h = 400;
      this.scale = scale;
      this.isTouching = false;
      this.topo = 0;

      this.image = loadImage("assets/maquina push.png");

      this.ballsResult = [];

      for(var i = 0; i < 4; i++){
         var ballResult = createSprite(this.ww - 185,this.wh - 360 + (80*i),35,35);
         ballResult.shapeColor = balls[4-i-1].color;
         this.ballsResult.push(ballResult);
      }

      this.bodyLeft = Bodies.rectangle(this.ww-330,this.wh - 150, 80, 20,options);
      World.add(world, this.bodyLeft);

      this.sprite = createSprite(this.x,this.y);
      this.sprite.addImage("imagem", this.image);
      this.sprite.scale = this.scale;

   }

   display(){

      push();
      rectMode(CENTER);
      imageMode(CENTER);
      noStroke();
      fill("orange");
      rect(this.bodyLeft.position.x, this.bodyLeft.position.y, 80, 20);
      pop();
   }

}