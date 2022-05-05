var txt = `Russia Russian Ukrainian Ukraine Ministry of Defense Donbass Putin military special operation Mariupol protection DPR APU LC USA time nationalists residents the president sanctions frames MFA UN Moscow help negotiation programs refugees Lavrov sides Luhansk strength Human Kyiv foreign folk data territories chapter today support day new told courage security city Donetsk declared`;
txt = txt.split(' ')
// console.log(txt)



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
  
  var introductionHeight, closureHeight;
  
    
}

function draw() {
  clear()
  // background(0)
  // translate(200,150)
  textStyle(BOLD);
  boxes.forEach(box => {
    // Getting vertices of each object
    var vertices = box.vertices;
    stroke(255);
    strokeWeight(2);
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
    text(box.word, 0, 10);
    pop();
    if (box.tag == "vb") {
      Body.setVelocity(box, {
        x: box.velocity.x,
        y: box.velocity.y
      });
    }
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
  closureHeight = document.getElementById('closure').getBoundingClientRect().y


  if (introductionHeight < 0) {
    document.getElementById("background").style.opacity = 0
    document.getElementById("background").style.transition = 'opacity 500ms'
  }
  else{
    document.getElementById("background").style.opacity = 1
    document.getElementById("background").style.transition = 'opacity 500ms'
  }

if(window.height > closureHeight + 500) {
    document.getElementById("background").style.opacity = 1
    document.getElementById("background").style.transition = 'opacity 500ms'
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
  textSize(40);
  for (var i = 0; i < txt.length; i++) {

    // Start drawing
    push();
    let useWord = txt[i];
    // Use random color for each word, because jieba.js didn't contain pos.
    let item = ["noun", "adj", "vb", "other"];
    let tag = item[Math.floor(Math.random() * item.length)];
    let useColor = "white";
    let box = Bodies.rectangle(xx + 100, (5 * int(i / 10)) - 100, textWidth(useWord) + 16, 40);
    box.word = useWord;
    box.color = useColor;
    box.tag = tag;
    Body.setVelocity(box, {
      x: 0,
      y: -20
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