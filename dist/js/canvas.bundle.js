/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lineIntersect = __webpack_require__(1);

// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', function () {
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
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function lineToAngle(c, x1, y1, length, angle) {
  angle *= Math.PI / 180;

  var x2 = x1 + length * Math.cos(angle);
  var y2 = y1 + length * Math.sin(angle);

  c.moveTo(x1, y1);
  c.lineTo(x2, y2);

  return { x: x2, y: y2 };
}

/*****************************/
// constants
var LINE_SPACING = 15;
var NUM_LINES = 30;
var bottomFrontCenterHeight = canvas.height * 0.65;
var topRightMaskLine = {
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

Line.prototype.update = function () {
  // update positions here

  if (this.bottomFrontCenterHeight < canvas.height * 0.65) {
    this.bottomFrontCenterHeight = canvas.height + 100 - LINE_SPACING;
  }

  this.bottomFrontCenterHeight -= this.dx;
  this.draw();
};

Line.prototype.draw = function () {
  c.beginPath();

  // set beginning points of rightLine
  this.rightLine.p1.x = canvas.width / 2;
  this.rightLine.p1.y = this.bottomFrontCenterHeight;

  // set end points of rightLine
  this.rightLine.p2 = lineToAngle(c, canvas.width / 2, this.bottomFrontCenterHeight, 300, -60);

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

Line.prototype.drawTopLine = function () {
  // get point of intersection between rightLine and mask
  // -if there is an intersection, draw the topLine
  this.intersectionWithTopRightMask = this.getRightLineMaskIntersection();
  if (this.intersectionWithTopRightMask !== null) {
    c.beginPath();
    lineToAngle(c, this.intersectionWithTopRightMask.x, this.intersectionWithTopRightMask.y, 180, -150);

    c.strokeStyle = this.color;
    c.lineWidth = 2;
    c.lineCap = 'round';

    c.stroke();
  }
};

Line.prototype.getRightLineMaskIntersection = function () {
  var foo = lineIntersect.checkIntersection(this.rightLine.p1.x, this.rightLine.p1.y, this.rightLine.p2.x, this.rightLine.p2.y, topRightMaskLine.p1.x, topRightMaskLine.p1.y, topRightMaskLine.p2.x, topRightMaskLine.p2.y);

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
var lines = [];
function init() {
  // create array of Line objects
  for (var i = 0; i < NUM_LINES; i++) {
    var _bottomFrontCenterHeight = canvas.height + 100 - LINE_SPACING * i;
    lines.push(new Line(_bottomFrontCenterHeight, 'white'));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'blue';
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < lines.length; i++) {
    lines[i].update();
  }

  drawTopMask();

  // draw top lines
  for (var _i = 0; _i < lines.length; _i++) {
    lines[_i].drawTopLine();
  }

  drawBottomMask();
}

init();
animate();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__check_intersection__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__colinear_point_within_segment__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "checkIntersection", function() { return __WEBPACK_IMPORTED_MODULE_0__check_intersection__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "colinearPointWithinSegment", function() { return __WEBPACK_IMPORTED_MODULE_1__colinear_point_within_segment__["a"]; });




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = checkIntersection;
var COLINEAR = intersectResult('colinear');
var PARALLEL = intersectResult('parallel');
var NONE = intersectResult('none');
/**
* Check how two line segments intersect eachother. Line segments are represented
* as (x1, y1)-(x2, y2) and (x3, y3)-(x4, y4).
*
* @param {number} x1
* @param {number} y1
* @param {number} x2
* @param {number} y2
* @param {number} x3
* @param {number} y3
* @param {number} x4
* @param {number} y4
* @return {object} Object describing intersection that looks like
*    {
*      type: none|parallel|colinear|intersecting,
*      point: {x, y} - only defined when type == intersecting
*    }
*/

function checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  var numeA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  var numeB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

  if (denom == 0) {
    if (numeA == 0 && numeB == 0) {
      return COLINEAR;
    }

    return PARALLEL;
  }

  var uA = numeA / denom;
  var uB = numeB / denom;

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return intersecting({
      x: x1 + uA * (x2 - x1),
      y: y1 + uA * (y2 - y1)
    });
  }

  return NONE;
}

function intersecting(point) {
  var result = intersectResult('intersecting');
  result.point = point;
  return result;
}

function intersectResult(type) {
  return {
    type: type
  };
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = colinearPointWithinSegment;
/**
* Assuming a point is on same line as a line segment, tell if that point is
* on the line segment.
*
* @param {number} pointX - X of point
* @param {number} pointY - Y of point
* @param {number} startX - X of line segment start
* @param {number} startY - Y of line segment start
* @param {number} endX   - X of line segment end
* @param {number} endY   - Y of line segment end
* @return {boolean} true if point is within segment, false otherwise.
*/
function colinearPointWithinSegment(pointX, pointY, startX, startY, endX, endY) {
  if (startX != endX) {
    if (startX <= pointX && pointX <= endX) return true;
    if (startX >= pointX && pointX >= endX) return true;
  } else {
    if (startY <= pointY && pointY <= endY) return true;
    if (startY >= pointY && pointY >= endY) return true;
  }

  return false;
}

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map