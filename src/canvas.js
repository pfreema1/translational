const lineIntersect = require('line-intersect');

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

function lineToAngle(c, x1, y1, length, angle) {
  angle *= Math.PI / 180;

  let x2 = x1 + length * Math.cos(angle);
  let y2 = y1 + length * Math.sin(angle);

  c.moveTo(x1, y1);
  c.lineTo(x2, y2);

  return { x: x2, y: y2 };
}

/*****************************/
// constants
const LINE_SPACING = 15;
const NUM_LINES = 30;
const bottomFrontCenterHeight = canvas.height * 0.65;
const topRightMaskLine = {
  p1: {
    x: canvas.width / 2,
    y: bottomFrontCenterHeight
  },
  p2: {
    x: canvas.width / 2 + 1000 * Math.cos(-30 * Math.PI / 180),
    y: bottomFrontCenterHeight + 1000 * Math.sin(-30 * Math.PI / 180)
  }
};

/*****************************
 **		Line
 ******************************/

function Line(bottomFrontCenterHeight, color) {
  this.bottomFrontCenterHeight = bottomFrontCenterHeight;
  this.color = color;
  this.dx = 0.2;

  this.intersectionWithTopRightMask = {
    x: null,
    y: null
  };

  this.rightLine = {
    p1: null,
    p2: null
  };

  this.rightLine.p1 = {
    x: null,
    y: null
  };

  this.rightLine.p2 = {
    x: null,
    y: null
  };

  this.topLine = {
    p1: null,
    p2: null
  };
}

Line.prototype.update = function() {
  // update positions here

  if (this.bottomFrontCenterHeight < canvas.height * 0.65) {
    this.bottomFrontCenterHeight = canvas.height + 100 - LINE_SPACING;
  }

  this.bottomFrontCenterHeight -= this.dx;
  this.draw();
};

Line.prototype.draw = function() {
  c.beginPath();

  // set beginning points of rightLine
  this.rightLine.p1.x = canvas.width / 2;
  this.rightLine.p1.y = this.bottomFrontCenterHeight;

  // set end points of rightLine
  this.rightLine.p2 = lineToAngle(
    c,
    canvas.width / 2,
    this.bottomFrontCenterHeight,
    300,
    -60
  );

  // draw left line
  lineToAngle(c, canvas.width / 2, this.bottomFrontCenterHeight, 180, -150);

  // // get point of intersection between rightLine and mask
  // // -if there is an intersection, draw the topLine
  // this.intersectionWithTopRightMask = this.getRightLineMaskIntersection();
  // if (this.intersectionWithTopRightMask !== null) {
  //   lineToAngle(
  //     c,
  //     this.intersectionWithTopRightMask.x,
  //     this.intersectionWithTopRightMask.y,
  //     600,
  //     -150
  //   );
  // }

  c.strokeStyle = this.color;
  c.lineWidth = 2;
  c.lineCap = 'round';

  c.stroke();
};

Line.prototype.drawTopLine = function() {
  // get point of intersection between rightLine and mask
  // -if there is an intersection, draw the topLine
  this.intersectionWithTopRightMask = this.getRightLineMaskIntersection();
  if (this.intersectionWithTopRightMask !== null) {
    c.beginPath();
    lineToAngle(
      c,
      this.intersectionWithTopRightMask.x,
      this.intersectionWithTopRightMask.y,
      180,
      -150
    );

    c.strokeStyle = this.color;
    c.lineWidth = 2;
    c.lineCap = 'round';

    c.stroke();
  }
};

Line.prototype.getRightLineMaskIntersection = function() {
  let foo = lineIntersect.checkIntersection(
    this.rightLine.p1.x,
    this.rightLine.p1.y,
    this.rightLine.p2.x,
    this.rightLine.p2.y,
    topRightMaskLine.p1.x,
    topRightMaskLine.p1.y,
    topRightMaskLine.p2.x,
    topRightMaskLine.p2.y
  );

  if (foo.type === 'none') {
    return null;
  } else {
    return foo.point;
  }
};

/*****************************
 **		Mask
 ******************************/
function drawBottomMask() {
  //bottom mask right
  c.save();
  c.translate(canvas.width / 2, canvas.height * 0.9);
  c.rotate(-30 * Math.PI / 180);
  c.fillStyle = 'blue';
  c.fillRect(-250, -40, 1000, 500);
  c.restore();
  // bottom mast left
  c.save();
  c.translate(canvas.width / 2, canvas.height * 0.9);
  c.rotate(30 * Math.PI / 180);
  c.fillStyle = 'blue';
  c.fillRect(-450, -40, 1000, 500);
  c.restore();
}

function drawTopMask() {
  // c.beginPath();

  c.moveTo(topRightMaskLine.p1.x, topRightMaskLine.p1.y);
  c.lineTo(topRightMaskLine.p2.x, topRightMaskLine.p2.y);
  c.lineTo(canvas.width / 2, topRightMaskLine.p2.y);

  c.fillStyle = 'blue';
  c.fill();
}

/*****************************/

// Implementation
let lines = [];
function init() {
  // create array of Line objects
  for (let i = 0; i < NUM_LINES; i++) {
    let bottomFrontCenterHeight = canvas.height + 100 - LINE_SPACING * i;
    lines.push(new Line(bottomFrontCenterHeight, 'white'));
  }
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

  drawTopMask();

  // draw top lines
  for (let i = 0; i < lines.length; i++) {
    lines[i].drawTopLine();
  }

  drawBottomMask();
}

init();
animate();
