/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
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