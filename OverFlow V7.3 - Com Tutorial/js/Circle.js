class Circle{
   constructor(x,y){
      
      var options = {
         restitution: 0.3,
         isStatic: true,
         density: 0.1,
         friction:0.5
      }

      this.op = {
         pilhaAtual: "maquinaPop",
         pilhaAnt: "",
         topo: false,
         pos: 0,
         mouseActive: false,
       }


      this.color = [random(0,255), random(0,255), random(0,255)];
      this.radius = 33;
      this.body = Bodies.circle(x,y,this.radius,options);
      World.add(world, this.body);

      this.sinalTop = createSprite(x,y-32,this.radius,10);
      this.sinalTop.visible = false;
      this.sinalTop.shapeColor = "red";

      this.sinalBottom = createSprite(x,y+32,this.radius,10);
      this.sinalBottom.visible = false;
      this.sinalBottom.shapeColor = "blue";

      collisionSinalBottomGroup.add(this.sinalBottom);
      collisionSinalTopGroup.add(this.sinalTop);
   }

   display(){

      push();
      ellipseMode(RADIUS);
      noStroke();
      fill(this.color);
      ellipse(this.body.position.x, this.body.position.y, this.radius);
      pop();
   }

   update(){
      this.sinalTop.x = this.body.position.x;
      this.sinalTop.y = this.body.position.y - 32;

      this.sinalBottom.x = this.body.position.x;
      this.sinalBottom.y = this.body.position.y + 32;
   }

}