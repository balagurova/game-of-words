var txt = `repellat Et harum quidem can get lorem ipsum dolore erere re vcvrvr  vrfgrefe  the context at any time from rendercanvas or just use render.context You could also extend the renderer using your own plugin Generally though the built in renderer is only intended for debugging so it is advised to write your own renderer for anything more complex Alternatively you can download a stable release or try the latest experimental alpha build (master) and include the script in your web page `;
txt = txt.split(' ')
console.log(txt)

let glitch, typeCounter = 0;

// Start Matter
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;
var Body = Matter.Body;
var Events = Matter.Events;
var engine;
var boxes = [];
//var Constraint = Matter.Constraint,
var ground, wallLeft, wallRight, wallCenter;

async function setup() {
  // Create an engine
  engine = Engine.create();
  createCanvas(windowWidth, windowHeight).parent('#background')
  // Creates rigid body models (wall and ground)
  // ground = Bodies.rectangle(0, height, width * 2, 1, {
  //   isStatic: true
  // });
 
 wallCenter = Bodies.rectangle(
    (window.innerWidth / 2), (window.innerHeight / 2 ) - 136, 550, 50,{render: { fillStyle: '#080808'}, isStatic: true });
ground = Bodies.rectangle(
(window.innerWidth / 2) + 160, window.innerHeight + 80, window.innerWidth + 320, 160,{render: { fillStyle: '#080808'}, isStatic: true });
    wallLeft = Bodies.rectangle( -80, window.innerHeight, 160,   window.innerHeight, { isStatic: true });
wallRight = Bodies.rectangle(window.innerWidth + 80, window.innerHeight, 160, 1200, { isStatic: true })










  // wallLeft = Bodies.rectangle(0, 0, 30, height, {
  //   isStatic: true
  // });
  // wallRight = Bodies.rectangle(width, 0, 30, height, {
  //   isStatic: true
  // });
  background(100);
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
    // if (tag == "nonu") {
    //   useColor = "blue";
    // } else if (tag == "adj") {
    //   useColor = "orange";
    //   strokeWeight(3);
    // } else if (tag == "vb") {
    //   useColor = "red";
    // }
    let box = Bodies.rectangle(xx, 45 * int(i / 10), textWidth(useWord) + 16, 40);
    box.word = useWord;
    box.color = useColor;
    box.tag = tag;
    Body.setVelocity(box, {
      x: 0,
      y: -5
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
  World.add(engine.world, [ground, wallLeft, wallRight, wallCenter]);
  Engine.run(engine);

  frameRate(30)
	imageMode(CENTER);

  //glitch
	imageMode(CENTER);

	glitch = new Glitch();
	setupGlitch(); // load image w/ random type

	}

function draw() {
  background(20);
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
      fill("black");
    }
    rotate(box.angle);
    noStroke();
    textAlign(CENTER);
    noStroke();
    text(box.word, 0, 10);
    pop();
    if (box.tag == "vb") {
      Body.setVelocity(box, {
        x: box.velocity.x,
        y: box.velocity.y - 0.4
      });
    }
  });
  ellipse(mouseX, mouseY, 5, 5);
  if (mouseIsPressed) {
    let bb = boxes.find(box =>
      inside([mouseX, mouseY], box.vertices.map(p => [p.x, p.y]))
    );
    console.log(bb);
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
  //glitch
  glitch.resetBytes();

	glitch.randomBytes(1); // add one random byte for movement

	glitch.buildImage(function() {
		// background(0); // clear background once image is ready
		// displayType(); // show text
	});
	image(glitch.image, width / 2, height / 2- 190, 700,88.84)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setupGlitch() {
	loadImage('./glitch/title.png', function(im) {
		glitch.loadType("image/webp"); // use random type
		glitch.loadImage(im);
	});
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


function mouseWheel(event){
  World.remove(engine.world, wallCenter)
}
