class Stack{
   constructor(x,y,w,h,image){
      
      var options = {
         isStatic: true,
      }

      this.image = loadImage(image)

      this.width = 20;
      this.height = 220;

      this.w = w;
      this.h = h;
      this.x = x;
      this.y = y;

      this.bodyLeft = Bodies.rectangle(x-10,y,this.width,this.height,options);
      World.add(world, this.bodyLeft);

      this.bodyRight = Bodies.rectangle(x+90,y,this.width,this.height,options);
      World.add(world, this.bodyRight);

      this.bodyBottom = Bodies.rectangle(x+35, height - 50 ,90,this.width,options);
      World.add(world, this.bodyBottom);

      this.spriteBottom = createSprite(x + 40,y,70,150);
      this.spriteBottom.visible = false;
   }

   display(){

      push();
      rectMode(CENTER);
      noStroke();
      imageMode(CENTER)
      //fill(this.color);
      image(this.image, this.x + 40, this.bodyLeft.position.y,this.w,this.h);
      //rect(this.bodyLeft.position.x, this.bodyLeft.position.y, this.width,this.height);
      //rect(this.bodyRight.position.x, this.bodyRight.position.y, this.width,this.height);
      //rect(this.bodyBottom.position.x, this.bodyBottom.position.y, 90, this.width);
      pop();
   }

}