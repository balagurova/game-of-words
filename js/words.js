var txt = `Russia Russian Ukraine military Ukrainian Donbass special operation Putin Mariupol president protection residents sanctions negotiation Kyiv USA time support humanitarian nationalists help countries weapon republic Moscow strength blows government Donetsk situation UN measures thousand programs refugees security forces Lavrov sides troops Luhansk Human foreign showed territory Western Crimea minister courage security Donetsk declared show channel control regions authorities heroism informed conditions children defense objects Belarus citizens economy media anti-Russian`.toUpperCase();
txt = txt.split(' ')
var font;
let box;
function preload(){
  font = 'input-mono'
}



// Start Matter
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
// var Composite = Matter.Composite;
var Body = Matter.Body;
// var Events = Matter.Events;
var engine;
var boxes = [];
// var Constraint = Matter.Constraint;
var ground, wallLeft, wallRight;
var introductionHeight;

async function setup() {
  
  createCanvas(window.innerWidth, innerHeight).parent('#background')
  resetSketch();
  
  var introductionHeight, finalSection;
  
    
}

function draw() {
  clear()
  // background(0)
  // translate(200,150)
  textFont(font);
  boxes.forEach(box => {
    // Getting vertices of each object
    var vertices = box.vertices;
 
   
    noFill();
    push();
    translate(box.position.x, box.position.y);
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
      vertex(vertices[i].x - box.position.x, vertices[i].y - box.position.y);
    }
    noStroke();
    fill(box.color);
    endShape(CLOSE);
    fill("white");
    if (box.color == "white") {
      fill("#141414");
    }
    rotate(box.angle);
    textAlign(CENTER);


    if(window.innerWidth >= 600){
      text(box.word, 0, 9);
    }
    else{
      text(box.word, 0, 6);
    }


    
    pop();
  });
  // ellipse(mouseX, mouseY, 5, 5);
  if (mouseIsPressed) {
    let bb = boxes.find(box =>
      inside([mouseX, mouseY], box.vertices.map(p => [p.x, p.y]))
    );
    // console.log(bb);
    if (bb) {
      Body.setVelocity(bb, {
        x: mouseX - pmouseX,
        y: mouseY - pmouseY
      });
      Body.setPosition(bb, {
        x: mouseX,
        y: mouseY
      });
    }
  }
  introductionHeight = document.getElementById('introduction').getBoundingClientRect().y
  finalSection = document.getElementById('finalSection').getBoundingClientRect().y


  
  if (window.innerWidth >600 && introductionHeight < -50) {
    document.getElementById("background").style.opacity = 0
    document.getElementById("background").style.transition = 'opacity 200ms'
  }
  else if (window.innerWidth < 600 && introductionHeight < -300) {
    document.getElementById("background").style.opacity = 0
    document.getElementById("background").style.transition = 'opacity 200ms'
  }
  else{
    document.getElementById("background").style.opacity = 1
    document.getElementById("background").style.transition = 'opacity 200ms'
  }

if(window.innerWidth > 600 && window.height > finalSection + 700) {
    document.getElementById("background").style.opacity = 1
    document.getElementById("background").style.transition = 'opacity 200ms'
  }

  else if(window.innerWidth < 600 && window.height > finalSection + 300) {
    document.getElementById("background").style.opacity = 1
    document.getElementById("background").style.transition = 'opacity 200ms'
  }


  
  


}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}



function inside(point, vs) {
  var x = point[0],
    y = point[1];
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];
    var intersect =
      yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}



function resetSketch(){
  frameRate(25)
  // Create an engine
  engine = Engine.create();
  ground = Bodies.rectangle(
    (window.innerWidth / 2) + 160, innerHeight+80, window.innerWidth + 320, 160, {
      render: {
        fillStyle: '#141414'
      },
      isStatic: true
    });
  wallLeft = Bodies.rectangle(-80, window.innerHeight, 160, window.innerHeight, {
    isStatic: true
  });
  wallRight = Bodies.rectangle(window.innerWidth + 80, window.innerHeight, 160, 1200, {
    isStatic: true
  })


  let xx = 0;
  if(window.innerWidth >= 600){
    textSize(22);
  }
  else{
    textSize(18);
  }

  for (var i = 0; i < txt.length; i++) {

    // Start drawing
    push();
    let useWord = txt[i];
    let useColor = "white";
    if(window.innerWidth >= 600){
      box = Bodies.rectangle(xx + 100, (5 * int(i / 10)) - 100, textWidth(useWord) + 12, 30);
    }
    else{
      box = Bodies.rectangle(xx + 100, (5 * int(i / 10)) - 100, textWidth(useWord) + 8, 20);
    }

    
    
    box.word = useWord;
    box.color = useColor;
    Body.setVelocity(box, {
      x: 0,
      y: -40
    });
    boxes.push(box);
    fill(useColor);

    text(useWord, xx, 45 * int(i / 10));
    // Stop drawing
    pop();
    xx += textWidth(useWord) + 10;
    if ((i + 1) % 10 == 0) {
      xx = 0;
    }
  }
  // add all of the bodies to the world
  World.add(engine.world, boxes);
  World.add(engine.world, [ground, wallLeft, wallRight]);

  Engine.run(engine);
}