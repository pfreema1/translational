// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

/*****************************/

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

/*****************************/
// constants
const LINE_SPACING = 15;
const NUM_LINES = 60;

/*****************************/

function lineToAngle(c, x1, y1, length, angle) {
  angle *= Math.PI / 180;

  let x2 = x1 + length * Math.cos(angle);
  let y2 = y1 + length * Math.sin(angle);

  c.moveTo(x1, y1);
  c.lineTo(x2, y2);

  return { x: x2, y: y2 };
}

// Line
function Line(bottomFrontCenterHeight, color) {
  this.bottomFrontCenterHeight = bottomFrontCenterHeight;
  this.color = color;
  this.dx = 0.2;
}

Line.prototype.update = function() {
  // update positions here

  if (this.bottomFrontCenterHeight < canvas.height * 0.25) {
    this.bottomFrontCenterHeight = canvas.height + 100 - LINE_SPACING;
  }

  this.bottomFrontCenterHeight -= this.dx;
  this.draw();
};

Line.prototype.draw = function() {
  c.beginPath();

  lineToAngle(c, canvas.width / 2, this.bottomFrontCenterHeight, 300, -60);
  lineToAngle(c, canvas.width / 2, this.bottomFrontCenterHeight, 300, -150);

  c.strokeStyle = this.color;
  c.lineWidth = 2;
  c.lineCap = 'round';

  c.stroke();
};

/*****************************/

// Implementation
let lines = [];
function init() {
  for (let i = 0; i < NUM_LINES; i++) {
    let bottomFrontCenterHeight = canvas.height + 100 - LINE_SPACING * i;
    console.log(bottomFrontCenterHeight);

    lines.push(new Line(bottomFrontCenterHeight, 'white'));
  }

  console.log(lines);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'blue';
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < lines.length; i++) {
    lines[i].update();
  }
}

init();
animate();
