/*
Mais estruturas de pilha e fila
Bolas cinzas como "lixo de memoria"
Tela inicial Modo de jogo 6 (FEITO)
Duas maquinas Pop (deixar o usuarios vê as bolas, não vê as bolas ou vê apenas a proxima);

*/


const World = Matter.World;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
const Body = Matter.Body;


var world,engine;
var balls = [];
var pilha, pilha1;
var ground;
var exit = [];
var jogada = 0;
var maquinaPop, maquinaPush;
var collisionGroup, collisionSinalBottomGroup, collisionSinalTopGroup;
var totalPush = 0;



function setup() {
  createCanvas(windowWidth, windowHeight);

  var nivel = createElement("h1", "Nível 01");
  nivel.position(width/2 - 20 ,30);

  tutorial();

  collisionGroup = new Group();
  collisionSinalBottomGroup = new Group();
  collisionSinalTopGroup = new Group();

  engine = Engine.create();
  world = engine.world;

  for(var c = 3; c >=0; c--){
    var ball = new Circle(90 + (80 * c),windowHeight-350);

    balls.push(ball);
  }
  
  pilha = new Stack(width/2-100,windowHeight - 160,95,220,"assets/pilha03.png");
  pilha1 = new Stack(width/2+100,windowHeight-160,95,220,"assets/pilha03.png");
  ground = new Ground(windowWidth/2, windowHeight-25, windowWidth,50);

  maquinaPop = new MachinePop(200,windowHeight-230,2);
  maquinaPush = new MachinePush(windowWidth-200,windowHeight-230,2);

  console.log(balls[3].color);
  //console.log(maquinaPush.ball0.shapeColor);

}

function draw() {
  background("#cbe4ea"); 
  Engine.update(engine);

  for(var i in balls){
    for(var c in balls){

      //Verifica se a parte de baixo da caixa encostou na base da Maquina Pop
      if(balls[i].sinalBottom.collide(collisionGroup)){
        balls[i].op.topo = true;
      }
    }
  }

  pilha.display();
  pilha1.display();
  maquinaPush.display();
  ground.display();
  
  empilhar(pilha);
  empilhar(pilha1);
  limit(pilha);
  limit(pilha1);

  cursor('grab');
  
  for(var i = 0; i < balls.length; i++){
    if(balls[i] !== undefined){
      balls[i].display();
      balls[i].update();
    }
  }

  //Abrir menu
  if(keyDown("esc")){
    menuJogo();
  }

  
  //Verifica se o jogador colocou todas as bolas corretamente e ganhou o jogo
  if(totalPush === 4){
    winner("gameModeOne.html", "gameModeTwo.html");
    totalPush = 0;
    //saveJSON(balls[0].op,'balls.json');
    //save(balls[0].op, 'my.json');
  }
 
  mouseClick();

  mousepressed();
  checkPush();
  drawSprites();

}

function mousepressed(){
  for(var n in balls){
    if(balls[n].op.topo){
      var d = dist(mouseX, mouseY, balls[n].body.position.x, balls[n].body.position.y);
      if(d < 30 && mouseIsPressed){
        balls[n].op.mouseActive = true;
      }

      if(balls[n].op.mouseActive && mouseIsPressed){
          Matter.Body.setPosition(balls[n].body, {x: mouseX, y: mouseY});
      }
      else if(!mouseIsPressed){
          balls[n].op.mouseActive = false;
      }
    }
  }
}



function checkPush(){
  for(var c in balls){
    var collision = Matter.SAT.collides(balls[c].body, maquinaPush.bodyLeft);
    if(collision.collided){
      if(maquinaPush.ballsResult[0].shapeColor === balls[c].color){
        Matter.Body.setPosition(balls[c].body, {x: windowWidth ,y: windowHeight + 200})
        maquinaPush.ballsResult[0].width = 170;
        maquinaPush.ballsResult[0].height = 90;
        balls[c].op.pilhaAtual = "maquinaPush";
        World.remove(world, balls[c].body);
        totalPush = 1;
        //delete balls[c];
      }
      

      if(maquinaPush.ballsResult[1].shapeColor === balls[c].color && totalPush === 1){
        Matter.Body.setPosition(balls[c].body, {x: windowWidth ,y: windowHeight + 200})
        maquinaPush.ballsResult[1].width = 170;
        maquinaPush.ballsResult[1].height = 90;
        balls[c].op.pilhaAtual = "maquinaPush";
        World.remove(world, balls[c].body);
        totalPush = 2;
        //delete balls[c];
      }
      if(maquinaPush.ballsResult[1].shapeColor === balls[c].color && totalPush < 1){
        World.remove(world, balls[1].body);
        Body.setPosition(balls[c].body,{x:-100,y:0})
        loser("gameModeOne.html")
      }


      if(maquinaPush.ballsResult[2].shapeColor === balls[c].color && totalPush === 2){
        Matter.Body.setPosition(balls[c].body, {x: windowWidth ,y: windowHeight + 200});
        maquinaPush.ballsResult[2].width = 170;
        maquinaPush.ballsResult[2].height = 90;
        balls[c].op.pilhaAtual = "maquinaPush";
        World.remove(world, balls[c].body);
        totalPush = 3;
        //delete balls[c];
      }
      if(maquinaPush.ballsResult[2].shapeColor === balls[c].color && totalPush < 2){
        Body.setPosition(balls[c].body,{x:-100,y:0})
        loser("gameModeOne.html")
      }


      if(maquinaPush.ballsResult[3].shapeColor === balls[c].color && totalPush === 3){
        Matter.Body.setPosition(balls[c].body, {x: windowWidth ,y: windowHeight + 200});
        maquinaPush.ballsResult[3].width = 170;
        maquinaPush.ballsResult[3].height = 90;
        balls[c].op.pilhaAtual = "maquinaPush";
        World.remove(world, balls[c].body);
        totalPush = 4;
        //delete balls[c];
      }
      if(maquinaPush.ballsResult[3].shapeColor === balls[c].color && totalPush < 3){
        Body.setPosition(balls[c].body,{x:-100,y:0})
        loser("gameModeOne.html")
        //window.location.reload();
      }
    }
    
  }
}

function mouseClick(){
  if(mousePressedOver(maquinaPop.button)){
    if(!balls[0].op.topo && balls[0].op.pilhaAtual === "maquinaPop"){
        Matter.Body.setPosition(balls[0].body, {x:maquinaPop.sprite.x + 140, y:maquinaPop.sprite.y - 140 });
        Matter.Body.setStatic(balls[0].body, false);
     }
     else if(!balls[1].op.topo && balls[1].op.pilhaAtual === "maquinaPop" && (balls[0].op.pilhaAtual === "pilha" || balls[0].op.pilhaAtual === "maquinaPush")){
        Matter.Body.setPosition(balls[1].body, {x:maquinaPop.sprite.x + 140, y:maquinaPop.sprite.y - 140 })
        Matter.Body.setStatic(balls[1].body, false);
     }
     else if(!balls[2].op.topo && balls[2].op.pilhaAtual === "maquinaPop" && (balls[1].op.pilhaAtual === "pilha" || balls[1].op.pilhaAtual === "maquinaPush")){
        Matter.Body.setPosition(balls[2].body, {x:maquinaPop.sprite.x + 140, y:maquinaPop.sprite.y - 140 })
        Matter.Body.setStatic(balls[2].body, false);
     }
     else if(!balls[3].op.topo && balls[3].op.pilhaAtual === "maquinaPop" && (balls[2].op.pilhaAtual === "pilha" || balls[2].op.pilhaAtual === "maquinaPush")){
        Matter.Body.setPosition(balls[3].body, {x:maquinaPop.sprite.x + 140, y:maquinaPop.sprite.y - 140 })
        Matter.Body.setStatic(balls[3].body, false);
     }
  }
}

function empilhar(pilha){
  for(var c = 0; c < balls.length; c++){
     if(balls[c] !== undefined){
        if(pilha.spriteBottom.isTouching(balls[c].sinalBottom)){
           //balls[c].op.pos = 1;
           balls[c].op.pilhaAtual = "pilha";
        }
        if(balls[c].sinalTop.isTouching(collisionSinalBottomGroup)){
           balls[c].op.topo = false;
        }
        if(!balls[c].sinalTop.isTouching(collisionSinalBottomGroup) && balls[c].op.pilhaAtual !== "maquinaPop"){
           balls[c].op.topo = true;
        }
     }
  }
}

function limit(pilha){
  for(var c in balls){
    if(balls[c].sinalBottom.isTouching(pilha.spriteBottom)){
      balls[c].body.position.x = pilha.bodyBottom.position.x + 8;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}