import pace from 'pace-progress';
import Headroom from 'headroom.js';
import 'gsap/TweenMax.js';
import 'greensock-js-simply-green/src/bonus-files-for-npm-users/DrawSVGPlugin.js';
import $ from 'jquery';
import animsition from 'animsition';
import jquery_inview from 'jquery-inview';
import slick_carousel from 'slick-carousel';
import lightgallery from 'lightgallery';
import lgFullscreen from 'lg-fullscreen';
import lgPager from 'lg-pager';
import lgShare from 'lg-share';
import lgThumbnail from 'lg-thumbnail';
import lgVideo from 'lg-video';
import lgZoom from 'lg-zoom';
import './lib/jquery.arctext';

window.$ = $;

// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

// ClipPath('.ministry-introductions .welcome', '5% 5%, 100% 0%, 100% 75%');

// Hide / show the master navigation menu

// grab an element
var myElement = document.querySelector('#main-navigation');
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init();

// detect IE, returns version of IE or false, if browser is not Internet Explorer

function detectIE() {
	var ua = window.navigator.userAgent;

	// Test values; Uncomment to check result …

	// IE 10
	// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

	// IE 11
	// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

	// Edge 12 (Spartan)
	// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

	// Edge 13
	// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

	var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
		if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
		if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

// Foundation.SmoothScroll.defaults.easing = 'swing';


// jQuery functions

// start foundation

$(document).foundation();

// configure animsition

$('.animsition').animsition({
	inClass: 'overlay-slide-in-top',
	outClass: 'overlay-slide-out-top',
	inDuration: 1500,
	outDuration: 800,
	linkElement: '.animsition-link',
	// e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
	loading: true,
	loadingParentElement: 'body', //animsition wrapper element
	loadingClass: 'animsition-loading',
	loadingInner: '<div class="loading-icon loading"></div>', // e.g '<img src="loading.svg" />'
	timeout: false,
	timeoutCountdown: 5000,
	onLoadEvent: true,
	browser: ['animation-duration', '-webkit-animation-duration'],
	// "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
	// The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
	overlay : true,
	overlayClass : 'animsition-overlay-slide',
	overlayParentElement : 'body',
	transition: function (url){ window.location.href = url; }
});

// toggle fade on menu icon when clicked

// $('#offCanvas').bind('opened.zf.offcanvas closed.zf.offcanvas', function () {
// 	$('.top-bar-title .menu-icon').fadeToggle(1000);
// });

// add span tags to characters inside selected element

$('.text-span').each(function () {
	var letters = $(this).text().split(''),
	$container = $(this).empty();

	$.each(letters, function (_, letter) {
		$('<span>', {text: letter}).appendTo($container);
	});
});

// arc text

$('.event-flyer .day').each(function () {
	var textCount = $(this).html().length;
	if (textCount > 30) {
		$(this).arctext({radius: 800}).parent().addClass('more-space');
	} else {
	    $(this).arctext({radius: 400});
	}
});

// gsap svg line animation for snippet posts for blog and media

// once js runs un-hide the svg

TweenLite.set('.snippet__deco--lines', {visibility:'visible'});

// hide the stroke

TweenLite.set('.snippet__deco--line', {drawSVG:0});

$('a.snippet').hover(function() {
	var curSnippetHighlight = $(this).find('.snippet__deco--line');
	var snippetHighlight = TweenLite.to(curSnippetHighlight, 0.5, {drawSVG:true});
}, function() {
	var curSnippetHighlight = $(this).find('.snippet__deco--line');
	var snippetHighlight = TweenLite.to(curSnippetHighlight, 0.5, {drawSVG:false});
});

// logo border svg animation

TweenLite.set('.logo-border', {visibility:'visible'});

// hide the stroke

TweenLite.set('.logo-border-path', {drawSVG:0});

$('a.logo').hover(function() {
	var curLogoHighlight = $(this).find('.logo-border-path');
	var logoHighlight = TweenLite.to(curLogoHighlight, 1, {drawSVG:true});
}, function() {
	var curLogoHighlight = $(this).find('.logo-border-path');
	var logoHighlight = TweenLite.to(curLogoHighlight, 1, {drawSVG:false});
});

$(window).bind('load', function () {

	// add animation class when in viewport

	$('.content p, blockquote, .snippet__description').bind('inview', function (event, visible) {
		if (visible === true) {
			// element is now visible in the viewport
			$(this).addClass('fade');
		}
	});

	// // create the 'circle spin' animation when in view, only once

	$('.logo-slide').bind('inview', function (event, visible) {
		if (visible === true) {
			// element is now visible in the viewport
			TweenMax.fromTo('.circle-text', 6, {
					rotation: 0,
					transformOrigin: '50% 50%',
				},
				{
					rotation: 360,
					transformOrigin: '50% 50%',
				}
			);
			$('.logo-slide').off('inview');
		}
	});

	// add images to colour blur

	$('.image-colour').bind('inview', function (event, visible) {
		if (visible === true) {
			// detect when images are loaded

			// Iterate through all image wrappers
			$('.image-colour').each(function () {
				// Get the wrapper and image elements
				var $wrapper = $(this);
				var img = $wrapper.find('img')[0];

				// Create temp image and set the src
				var tempImg = new Image();
				tempImg.src = img.src;

				// Callback when the image is loaded
				tempImg.onload = function () {
					// Add .loaded class to wrapper
					$wrapper.addClass('loaded');
				};
			});
		}
	});

});

// Get IE or Edge browser version

var version = detectIE();

if (version === false) {
	// for not-ie
	null;
} else if (version >= 12) {
	$('.ministry, .blog-entries, .hero-section').addClass('ie-fix');
	$('.page-main').removeClass('slope-page');
	$('.ministry .content').removeClass().addClass('content small-12 columns');
} else {
	$('.ministry, .blog-entries, .hero-section').addClass('ie-fix');
	$('.page-main').removeClass('slope-page');
	$('.ministry .content').removeClass().addClass('content small-12 columns');
	$('body').addClass('old-ie');
}

// detect iOS and add class to body

// var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// if (iOS) {
// 	$('body').addClass('iOS')
// }

// clip-path polyfill

function clippathPolyfill(){
	var current_width = $(window).width();
	if (current_width < 640){
		$('.ministry-introductions .welcome, .ministry-introductions .quote').css({'clip-path': 'url(#welcomesmallSvg)', '-webkit-clip-path': 'polygon(0px 0px, 100% 30%, 100% 70%, 0px 100%)'});
		$('.ministry-introductions .ministry-1, .ministry-introductions .ministry-3').css({'clip-path': 'url(#ministry1smallSvg)', '-webkit-clip-path': 'polygon(0px 20%, 100% 0px, 100% 100%, 0px 100%)'});
		$('.ministry-introductions .ministry-2').css({'clip-path': 'url(#ministry2smallSvg)', '-webkit-clip-path': 'polygon(0px 0px, 100% 20%, 100% 100%, 0px 100%)'});
		$('.slope-page').css({'clip-path': 'url(#slopesmallSvg)', '-webkit-clip-path': 'polygon(0px 0px, 100% 10%, 100% 100%, 0px 100%)'});
	} else {
		$('.ministry-introductions .welcome, .ministry-introductions .quote').css({'clip-path': 'url(#welcomeSvg)', '-webkit-clip-path': 'polygon(100% 70%, 0px 0px, 0px 100%)'});
		$('.ministry-introductions .ministry-1').css({'clip-path': 'url(#ministry1Svg)', '-webkit-clip-path': 'polygon(0px 40%, 100% 0px, 100% 100%, 0px 100%)'});
		$('.ministry-introductions .ministry-2').css({'clip-path': 'url(#ministry2Svg)', '-webkit-clip-path': 'polygon(0px 0px, 100% 40%, 100% 100%, 0px 100%)'});
		$('.ministry-introductions .ministry-3').css({'clip-path': 'url(#ministry3Svg)', '-webkit-clip-path': 'polygon(0px 40%, 100% 0px, 100% 100%, 0px 60%)'});
		$('.slope-page').css({'clip-path': 'url(#slopeSvg)', '-webkit-clip-path': 'polygon(0px 0px, 100% 17%, 100% 100%, 0px 100%)'});
	}

}

$(document).ready(function () {

	// initiate lightGallery plugin
	$('#lightgallery').lightGallery();

	clippathPolyfill();

});

$(window).resize(function () {

	clippathPolyfill();

});


// slick slider

$('.homepage-slider').slick({
	dots: true,
	infinite: true,
	speed: 300,
	slidesToShow: 1
	// adaptiveHeight: true
});

// add active class for pages in channels

$('.context-blog .main-menu .blog, .context-gallery .main-menu .media').addClass('active');

// ajax contact page

$('#ajax-contact').submit(function (ev) {
	// Prevent the form from actually submitting
	ev.preventDefault();
	$('#spinner').addClass('show');

	// Get the post data
	var data = $(this).serialize();

	// Send it to the server
	$.post('/', data, function (response) {
		if (response.success) {
			$('#thanks').fadeIn();
			$('#error').fadeOut();
			$('#spinner').removeClass('show');
			$('#ajax-contact').each(function () {
				this.reset();
			});
		} else {
			$('#error').fadeIn();
			$('#thanks').fadeOut();
			$('#spinner').removeClass('show');
		}
	});
});

// hide maps overlay when clicked

// $('.google-map-overlay').on('click', function () {
// 	$(this).toggleClass('hide');
// 	return false;
// });