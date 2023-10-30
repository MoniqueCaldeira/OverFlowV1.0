/*
Mais estruturas de pilha e fila
Bolas cinzas como "lixo de memoria"
Tela inicial Modo de jogo 6 (FEITO)
Duas maquinas Pop (deixar o usuarios vê as bolas, não vê as bolas ou vê apenas a proxima);

*/


const World = Matter.World;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;


var world, engine;
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

  var nivel = createElement("h1", "Nível 02");
  nivel.position(width/2 - 20 ,30);

  collisionGroup = new Group();
  collisionSinalBottomGroup = new Group();
  collisionSinalTopGroup = new Group();


  engine = Engine.create();
  world = engine.world;

  for (var c = 5; c >= 0; c--) {
    switch (c) {
      case 0:
        var ball = new Circle(90, windowHeight - 350);
        break;
      case 1:
        var ball = new Circle(180, windowHeight - 350);
        break;
      case 2:
        var ball = new Circle(270, windowHeight - 350);
        break;
      case 3:
        var ball = new Circle(90, windowHeight - 270);
        break;
      case 4:
        var ball = new Circle(180, windowHeight - 270);
        break;
      case 5:
        var ball = new Circle(270, windowHeight - 270);
        break;
      default: break;
    }

    balls.push(ball);
  }

  pilha = new Stack(width / 2 - 100, windowHeight - 160, 95, 220, "assets/pilha03.png");
  pilha1 = new Stack04(width / 2 + 100, windowHeight - 210, 95, 320, "assets/pilha04.png");
  ground = new Ground(windowWidth / 2, windowHeight - 25, windowWidth, 50);

  maquinaPop = new MachinePop(200, windowHeight - 230, 2);
  maquinaPush = new MachinePush(windowWidth - 200, windowHeight - 230, 2);

  
}

function draw() {
  background("#cbe4ea");
  Engine.update(engine);

  for (var i in balls) {
    for (var c in balls) {


      //Verifica se a parte de baixo da caixa encostou na base da Maquina Pop
      if (balls[i].sinalBottom.collide(collisionGroup)) {
        balls[i].op.topo = true;
      }
    }
  }

  pilha.display();
  pilha1.display();
  maquinaPush.display();
  //maquinaPop.display();
  ground.display();

  empilhar(pilha);
  empilhar(pilha1);
  limit(pilha);
  limit(pilha1);

  cursor('grab');

  for (var i = 0; i < balls.length; i++) {
    if (balls[i] !== undefined) {
      balls[i].display();
      balls[i].update();
    }
  }

  //Abrir menu
  if(keyDown("esc")){
    menuJogo();
  }

  if (totalPush === 4) {
    //Mudar para o modo de Jogo 3
    winner("gameModeTwo.html", "gameModeTwo.html");
    totalPush = 0;
    //saveJSON(balls[0].op,'balls.json');
    //save(balls[0].op, 'my.json');
  }

  mouseClick();

  mousepressed();
  checkPush();
  drawSprites();

}

function mousepressed() {
  for (var n in balls) {
    if (balls[n].op.topo) {
      var d = dist(mouseX, mouseY, balls[n].body.position.x, balls[n].body.position.y);
      if (d < 30 && mouseIsPressed) {
        balls[n].op.mouseActive = true;
      }

      if (balls[n].op.mouseActive && mouseIsPressed) {
        Matter.Body.setPosition(balls[n].body, { x: mouseX, y: mouseY });
      }
      else if (!mouseIsPressed) {
        balls[n].op.mouseActive = false;
      }
    }
  }
}


function checkPush() {
  for (var c in balls) {
    var collision = Matter.SAT.collides(balls[c].body, maquinaPush.bodyLeft);
    if (collision.collided) {
      if (maquinaPush.ballsResult[0].shapeColor === balls[c].color) {
        Matter.Body.setPosition(balls[c].body, { x: windowWidth, y: windowHeight + 200 })
        maquinaPush.ballsResult[0].width = 170;
        maquinaPush.ballsResult[0].height = 90;
        balls[c].op.pilhaAtual = "maquinaPush";
        World.remove(world, balls[c].body);
        totalPush = 1;
        //delete balls[c];
      }


      if (maquinaPush.ballsResult[1].shapeColor === balls[c].color && totalPush === 1) {
        Matter.Body.setPosition(balls[c].body, { x: windowWidth, y: windowHeight + 200 })
        maquinaPush.ballsResult[1].width = 170;
        maquinaPush.ballsResult[1].height = 90;
        balls[c].op.pilhaAtual = "maquinaPush";
        World.remove(world, balls[c].body);
        totalPush = 2;
        //delete balls[c];
      }
      if (maquinaPush.ballsResult[1].shapeColor === balls[c].color && totalPush < 1) {
        Matter.Body.setPosition(balls[c].body,{x:-100,y:0})
        loser("gameModeTwo.html")
      }


      if (maquinaPush.ballsResult[2].shapeColor === balls[c].color && totalPush === 2) {
        Matter.Body.setPosition(balls[c].body, { x: windowWidth, y: windowHeight + 200 });
        maquinaPush.ballsResult[2].width = 170;
        maquinaPush.ballsResult[2].height = 90;
        balls[c].op.pilhaAtual = "maquinaPush";
        World.remove(world, balls[c].body);
        totalPush = 3;
        //delete balls[c];
      }
      if (maquinaPush.ballsResult[2].shapeColor === balls[c].color && totalPush < 2) {
        Matter.Body.setPosition(balls[c].body,{x:-100,y:0})
        loser("gameModeTwo.html")
      }


      if (maquinaPush.ballsResult[3].shapeColor === balls[c].color && totalPush === 3) {
        Matter.Body.setPosition(balls[c].body, { x: windowWidth, y: windowHeight + 200 });
        maquinaPush.ballsResult[3].width = 170;
        maquinaPush.ballsResult[3].height = 90;
        balls[c].op.pilhaAtual = "maquinaPush";
        World.remove(world, balls[c].body);
        totalPush = 4;
        //delete balls[c];
      }
      if (maquinaPush.ballsResult[3].shapeColor === balls[c].color && totalPush < 3) {
        Matter.Body.setPosition(balls[c].body,{x:-100,y:0})
        loser("gameModeTwo.html")
      }
    }

  }
}

function mouseClick() {
  if (mousePressedOver(maquinaPop.button)) {
    if (!balls[0].op.topo && balls[0].op.pilhaAtual === "maquinaPop") {
      Matter.Body.setPosition(balls[0].body, { x: maquinaPop.sprite.x + 120, y: maquinaPop.sprite.y });
      Matter.Body.setStatic(balls[0].body, false);
    }
    else if (!balls[1].op.topo && balls[1].op.pilhaAtual === "maquinaPop" && (balls[0].op.pilhaAtual === "pilha" || balls[0].op.pilhaAtual === "maquinaPush")) {
      Matter.Body.setPosition(balls[1].body, { x: maquinaPop.sprite.x + 140, y: maquinaPop.sprite.y - 140 })
      Matter.Body.setStatic(balls[1].body, false);
    }
    else if (!balls[2].op.topo && balls[2].op.pilhaAtual === "maquinaPop" && (balls[1].op.pilhaAtual === "pilha" || balls[1].op.pilhaAtual === "maquinaPush")) {
      Matter.Body.setPosition(balls[2].body, { x: maquinaPop.sprite.x + 120, y: maquinaPop.sprite.y })
      Matter.Body.setStatic(balls[2].body, false);
    }
    else if (!balls[3].op.topo && balls[3].op.pilhaAtual === "maquinaPop" && (balls[2].op.pilhaAtual === "pilha" || balls[2].op.pilhaAtual === "maquinaPush")) {
      Matter.Body.setPosition(balls[3].body, { x: maquinaPop.sprite.x + 120, y: maquinaPop.sprite.y })
      Matter.Body.setStatic(balls[3].body, false);
    }
    else if (!balls[4].op.topo && balls[4].op.pilhaAtual === "maquinaPop" && (balls[3].op.pilhaAtual === "pilha" || balls[3].op.pilhaAtual === "maquinaPush")) {
      Matter.Body.setPosition(balls[4].body, { x: maquinaPop.sprite.x + 120, y: maquinaPop.sprite.y })
      Matter.Body.setStatic(balls[4].body, false);
    }
    else if (!balls[3].op.topo && balls[5].op.pilhaAtual === "maquinaPop" && (balls[4].op.pilhaAtual === "pilha" || balls[4].op.pilhaAtual === "maquinaPush")) {
      Matter.Body.setPosition(balls[5].body, { x: maquinaPop.sprite.x + 120, y: maquinaPop.sprite.y })
      Matter.Body.setStatic(balls[5].body, false);
    }
  }
}

function empilhar(pilha) {
  for (var c = 0; c < balls.length; c++) {
    if (balls[c] !== undefined) {
      if (pilha.spriteBottom.isTouching(balls[c].sinalBottom)) {
        //balls[c].op.pos = 1;
        balls[c].op.pilhaAtual = "pilha";
      }
      if (balls[c].sinalTop.isTouching(collisionSinalBottomGroup)) {
        balls[c].op.topo = false;
      }
      if (!balls[c].sinalTop.isTouching(collisionSinalBottomGroup) && balls[c].op.pilhaAtual !== "maquinaPop") {
        balls[c].op.topo = true;
      }
    }
  }
}

function limit(pilha) {
  for (var c in balls) {
    if (balls[c].sinalBottom.isTouching(pilha.spriteBottom)) {
      balls[c].body.position.x = pilha.bodyBottom.position.x + 8;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}