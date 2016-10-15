/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var mBoxGuy;
var mBalls;
var mCanvasWidth;
var mCanvasHeight;

/* http://www.color-hex.com/color-palette/24687 */
var COLORS_RGB = {
	YELLOW: [240,204,89],
	ORANGE: [229,98,59],
	RED: [201,41,53],
	GREEN: [91,212,91],
	BLUE: [6,162,178],
	WHITE: [255, 255, 255],
	BLACK: [0,0,0],
	PINK:[255,182,193],
	PURPLE:[153,50,204]
};

function getColor(colorString){
	var cVals = COLORS_RGB[colorString]
	return color(cVals[0],cVals[1],cVals[2]);
}

function hitWall(object){
	if(object.x < 0) return true;
	if(object.y < 0) return true;
	if(object.x > mCanvasWidth) return true;
	if(object.y > mCanvasHeight) return true;
	return false;
}

/*
	DEF for Ball object
*/

function Ball(x, y, size, gConstant, orbitSpeed, maxSpeed, radiusZero, color){
	this.gConstant = gConstant;
	this.x = x;
	this.y = y;
	this.xV = 0;
	this.yV = 0;
	this.size = size;
	this.orbitSpeed = orbitSpeed;
	this.maxSpeed = maxSpeed;
	this.radiusZero = radiusZero;
	this.color = color;
}

Ball.prototype.move = function(destX, destY){
	// calculate acceleration to box;
	var d = distance(this.x, this.y, destX, destY);

	var accel = 0;
	if(d > 0 && d > this.radiusZero) accel = this.gConstant/Math.pow(d, 2);
	var scale = 0;
	if(d > 0) scale = accel/ d;


	// Calculate accel in x and y directions.
	var xA = (destX - this.x) * scale;
	var yA = (destY - this.y) * scale;

	// if too close, set accel to 0.

	// based on accel in x and y update velocity
	this.xV += xA;
	// Do not go above maxSpeed;
	if(this.xV < 0 && Math.abs(this.xV) > this.maxSpeed)
		this.xV = (-1)*this.maxSpeed;
	else if(this.xV > this.maxSpeed) {
		this.xV = this.maxSpeed;
	}
	this.yV += yA;
	if(this.yV < 0 && Math.abs(this.yV) > this.maxSpeed)
		this.yV = (-1)*this.maxSpeed;
	else if(this.yV > this.maxSpeed) {
		this.yV = this.maxSpeed;
	}

	// based on velocity update
	this.x += this.xV;
	this.y += this.yV;

	// Change direction if you hit a wall.
	if(hitWall(this)){
		if(this.x < 0 && this.xV < 0) this.xV *= -1;
		if(this.x > mCanvasWidth && this.xV > 0) this.xV *= -1;
		if(this.y < 0 && this.yV < 0) this.yV *= -1;
		if(this.y > mCanvasHeight && this.yV > 0) this.yV *= -1;
	}
}


/*
	DEF for BoxGuy object
*/
function BoxGuy(x, y, accel, size, minSpeed, color){
	this.x = x;
	this.y = y;
	this.accel = accel;
	this.size = size;
	this.minSpeed = minSpeed;
	this.color = color;
}

BoxGuy.prototype.move = function(destX, destY){
	var d = distance(this.x, this.y, destX, destY);
	var speed = 0;
	if(d > this.minSpeed) speed = Math.max(this.accel * Math.pow(d, 2), this.minSpeed);
	var scale = 0;
	if(d !== 0) scale = speed/ d;
	var dX = (destX - this.x) * scale;
	var dY = (destY - this.y) * scale;

	this.x += dX;
	this.y += dY;
}

function distance(x1, y1, x2, y2){
	var d = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
	return d;
}

function drawBoxGuy(bxg){
	// draw square around boxGuy
	var offsetHalf = bxg.size/2;
	var offsetQuart = bxg.size/4;
	var offsetSix = bxg.size/6;
	var offsetEight = bxg.size/8;
	var c = getColor(bxg.color);
	fill(c);  // Use color variable 'c' as fill color

	rect(bxg.x-offsetHalf, bxg.y-offsetHalf, bxg.size, bxg.size, 10);
	// Draw eyes and mouth
	var white = getColor("WHITE");
	var black = getColor("BLACK");
	var pink = getColor("PINK");
	// left eye;
	fill(black);
	ellipse(bxg.x-offsetQuart,
			  	bxg.y-offsetQuart,
					offsetSix);
	fill(white);
	ellipse(bxg.x-offsetQuart,
					bxg.y-offsetQuart-3,
					5)

	// right eye;
	fill(black);
	ellipse(bxg.x+offsetQuart,
					bxg.y-offsetQuart,
					offsetSix);
	fill(white);
	ellipse(bxg.x+offsetQuart,
					bxg.y-offsetQuart-3,
					5);

	// mouth
	fill(pink);
	triangle(bxg.x-offsetEight, bxg.y,
					 bxg.x+offsetEight, bxg.y,
				 	 bxg.x, bxg.y+offsetSix);
}
function drawBall(ball){
	var c = getColor(ball.color);
	fill(c);  // Use color variable 'c' as fill color

	ellipse(ball.x, ball.y, ball.size);
}

function backgroundFrame(){
	var c = getColor("BLACK");
	fill(c);
	rect(0,0, mCanvasWidth, mCanvasHeight);
}



function setup() {
	mCanvasHeight = $(window).height();
	mCanvasWidth = $(window).width();
  createCanvas(mCanvasWidth, mCanvasHeight);
	noStroke();  // Don't draw a stroke around shapes

	// BoxGuy(x, y, accel, size, minSpeed, color)
	mBoxGuy = new BoxGuy(mCanvasWidth/2, mCanvasHeight/2, 0.0008, 80, 2, "PURPLE");

	// init balls
	mBalls = [];
	// Ball(x, y, size, gConstant, orbitSpeed, maxSpeed, radiusZero, color)
	mBalls.push(new Ball(mBoxGuy.x-50, mBoxGuy.y+50, 20, 7000, 5, 15, 60, "GREEN"));
	mBalls.push(new Ball(mBoxGuy.x+50, mBoxGuy.y-50, 25, 4000, 5, 12, 60, "RED"));
	mBalls.push(new Ball(mBoxGuy.x, mBoxGuy.y+80, 35, 3000, 5, 6, 50, "BLUE"));
}

function draw() {
	backgroundFrame();
	mBoxGuy.move(mouseX, mouseY);
	for(var i = 0; i < mBalls.length; i++){
		mBalls[i].move(mBoxGuy.x, mBoxGuy.y);
		drawBall(mBalls[i]);
	}
	drawBoxGuy(mBoxGuy);
}

function mousePressed() {
	return;
}










/*

function incrPixel(str) {
	return (parseInt(str.replace("px", "")) - 10) + "px";
}
function decrPixel(str) {
	return (parseInt(str.replace("px", "")) + 10) + "px";
}
var pacmanReverse = true;
var inkyReverse = true;
var blinkyReverse = true;
var pinkyReverse = true;
var clydeReverse = true;
var width = parseInt($("body").css("width").replace("px", ""));
var spriteWidth = parseInt($(".sprite").css("width").replace("px", ""));

(function($) {
	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Scrolly.
			$window.load(function() {

				var x = parseInt($('.wrapper').first().css('padding-top')) - 15;

				$('#nav a, .scrolly').scrolly({
					speed: 1000,
					offset: x
				});

			});

	});
	window.addEventListener("keydown", function(event){
		var upKey = 87;
		var downKey = 83;
		var leftKey = 65;
		var rightKey = 68;
		var posX = parseInt($("#pacman").css("left").replace("px", ""));
		var posY = parseInt($("#pacman").css("bottom").replace("px", ""));

		switch(event.keyCode){
			case upKey:
				$("#pacman").css("bottom", decrPixel($("#pacman").css("bottom")))
				break;
			case downKey:
				$("#pacman").css("bottom", incrPixel($("#pacman").css("bottom")))
				break;
			case leftKey:
				$("#pacman").css("left", incrPixel($("#pacman").css("left")))
				break;
			case rightKey:
				$("#pacman").css("left", decrPixel($("#pacman").css("left")))
				break;
		}
	});

	*/




	/*
	window.setInterval(function() {
		var posX = parseInt($("#pacman").css("left").replace("px", ""));
		if (posX < 0 || posX > width - spriteWidth) {
			pacmanReverse = !pacmanReverse;
		}
		if (pacmanReverse)  {
			$("#pacman").css("transform", "scaleX(-1)");
			$("#pacman").css("filter", "FlipH");
			$("#pacman").css("left", decrPixel($("#pacman").css("left")))
		}
		else {
			$("#pacman").css("transform", "scaleX(1)");
			$("#pacman").css("filter", "");
			$("#pacman").css("left", incrPixel($("#pacman").css("left")))
		}
	}, 100);
	window.setInterval(function() {
		var posX = parseInt($("#inky").css("left").replace("px", ""));
		if (posX < 0 || posX > width - spriteWidth) {
			inkyReverse = !inkyReverse;
		}
		if (inkyReverse)  {
			$("#inky").css("transform", "scaleX(-1)");
			$("#inky").css("filter", "FlipH");
			$("#inky").css("left", decrPixel($("#inky").css("left")))
		}
		else {
			$("#inky").css("transform", "scaleX(1)");
			$("#inky").css("filter", "");
			$("#inky").css("left", incrPixel($("#inky").css("left")))
		}
	}, 100);
	window.setInterval(function() {
		var posX = parseInt($("#blinky").css("left").replace("px", ""));
		if (posX < 0 || posX > width - spriteWidth) {
			blinkyReverse = !blinkyReverse;
		}
		if (blinkyReverse)  {
			$("#blinky").css("transform", "scaleX(-1)");
			$("#blinky").css("filter", "FlipH");
			$("#blinky").css("left", decrPixel($("#blinky").css("left")))
		}
		else {
			$("#blinky").css("transform", "scaleX(1)");
			$("#blinky").css("filter", "");
			$("#blinky").css("left", incrPixel($("#blinky").css("left")))
		}
	}, 100);
	window.setInterval(function() {
		var posX = parseInt($("#pinky").css("left").replace("px", ""));
		if (posX < 0 || posX > width - spriteWidth) {
			pinkyReverse = !pinkyReverse;
		}
		if (pinkyReverse)  {
			$("#pinky").css("transform", "scaleX(-1)");
			$("#pinky").css("filter", "FlipH");
			$("#pinky").css("left", decrPixel($("#pinky").css("left")))
		}
		else {
			$("#pinky").css("transform", "scaleX(1)");
			$("#pinky").css("filter", "");
			$("#pinky").css("left", incrPixel($("#pinky").css("left")))
		}
	}, 100);
	window.setInterval(function() {
		var posX = parseInt($("#clyde").css("left").replace("px", ""));
		if (posX < 0 || posX > width - spriteWidth) {
			clydeReverse = !clydeReverse;
		}
		if (clydeReverse)  {
			$("#clyde").css("transform", "scaleX(-1)");
			$("#clyde").css("filter", "FlipH");
			$("#clyde").css("left", decrPixel($("#clyde").css("left")))
		}
		else {
			$("#clyde").css("transform", "scaleX(1)");
			$("#clyde").css("filter", "");
			$("#clyde").css("left", incrPixel($("#clyde").css("left")))
		}
	}, 100);
})(jQuery);
*/
