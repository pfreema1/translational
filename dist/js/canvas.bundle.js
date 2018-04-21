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

/*****************************/
// constants
var LINE_SPACING = 15;
var NUM_LINES = 60;

/*****************************/

function lineToAngle(c, x1, y1, length, angle) {
  angle *= Math.PI / 180;

  var x2 = x1 + length * Math.cos(angle);
  var y2 = y1 + length * Math.sin(angle);

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

Line.prototype.update = function () {
  // update positions here

  if (this.bottomFrontCenterHeight < canvas.height * 0.25) {
    this.bottomFrontCenterHeight = canvas.height + 100 - LINE_SPACING;
  }

  this.bottomFrontCenterHeight -= this.dx;
  this.draw();
};

Line.prototype.draw = function () {
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
var lines = [];
function init() {
  for (var i = 0; i < NUM_LINES; i++) {
    var bottomFrontCenterHeight = canvas.height + 100 - LINE_SPACING * i;
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

  for (var i = 0; i < lines.length; i++) {
    lines[i].update();
  }
}

init();
animate();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map