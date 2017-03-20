(function ($){

	'use strict';

	// start foundation

	$(document).foundation();

	// configure animsition

	// $('.animsition').animsition({
	//     inClass: 'fade-in',
	//     outClass: 'fade-out',
	//     inDuration: 1500,
	//     outDuration: 800,
	//     linkElement: '.animsition-link',
	//     // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
	//     loading: true,
	//     loadingParentElement: 'body', //animsition wrapper element
	//     loadingClass: 'animsition-loading',
	//     loadingInner: '', // e.g '<img src="loading.svg" />'
	//     timeout: false,
	//     timeoutCountdown: 5000,
	//     onLoadEvent: true,
	//     browser: [ 'animation-duration', '-webkit-animation-duration'],
	//     // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
	//     // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
	//     overlay : true,
	//     overlayClass : 'animsition-overlay-slide',
	//     overlayParentElement : 'body',
	//     transition: function(url){ window.location.href = url; }
	// });
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
	    loadingInner: '', // e.g '<img src="loading.svg" />'
	    timeout: false,
	    timeoutCountdown: 5000,
	    onLoadEvent: true,
	    browser: [ 'animation-duration', '-webkit-animation-duration'],
	    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
	    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
	    overlay : true,
	    overlayClass : 'animsition-overlay-slide',
	    overlayParentElement : 'body',
	    transition: function (url){ window.location.href = url; }
	  });

	// toggle fade on menu icon when clicked

	$('#offCanvas').bind('opened.zf.offcanvas closed.zf.offcanvas', function () {
		$('.top-bar-title .menu-icon').fadeToggle(1000);
	});

	// add span tags to characters inside selected element

	$('.text-span').each(function () {
	    var letters = $(this).text().split(''),
	    $container = $(this).empty();

	    $.each(letters, function (_, letter) {
	       $('<span>', {text: letter}).appendTo($container);
	    });
	});

	// scroll to sections

	$('a[href*=\\#]:not([href=\\#])').click(function () {
		if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	// Hide / show the master navigation menu

	var previousScroll = 0;

	$(window).scroll(function (){

		var currentScroll = $(this).scrollTop();

    	// If the current scroll position is greater than 0 (the top) AND the current scroll position is less than the document height minus the window height (the bottom) run the navigation if/else statement.

		if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()){

			// If the current scroll is greater than the previous scroll (i.e we're scrolling down the page), hide the nav.

      		if (currentScroll > previousScroll){
				window.setTimeout(hideNav, 300);

			// Else we are scrolling up (i.e the previous scroll is greater than the current scroll), so show the nav.

			} else {
				window.setTimeout(showNav, 300);
			}

      		// Set the previous scroll value equal to the current scroll.

			previousScroll = currentScroll;
    	}

	});

	function hideNav() {
		$('[data-nav-status="toggle"]').removeClass('is-visible').addClass('is-hidden');
	}

	function showNav() {
		$('[data-nav-status="toggle"]').removeClass('is-hidden').addClass('is-visible');
	}

	$(window).bind('load', function () {

		// add animation class when in viewport

		$('.content p, blockquote').bind('inview', function (event, visible) {
			if (visible === true) {
				// element is now visible in the viewport
				$(this).addClass('fade');
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

	/**
	* detect IE
	* returns version of IE or false, if browser is not Internet Explorer
	*/

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

	// detect iOS and add class to body

	// var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	// if (iOS) {
	// 	$('body').addClass('iOS')
	// }

	// clip-path polyfill

	function clippathPolyfill() {
		var welcome = [[100, 70], [0, 0], [0, 100]];
		var welcomeSmall = [[0, 0], [100, 30], [100, 70], [0, 100]];
	    var ministry1 = [[0, 40], [100, 0], [100, 100], [0, 100]];
	    var ministry1Small = [[0, 20], [100, 0], [100, 100], [0, 100]];
	    var ministry2 = [[0, 0], [100, 40], [100, 100], [0, 100]];
	    var ministry2Small = [[0, 0], [100, 20], [100, 100], [0, 100]];
	    var ministry3 = [[0, 40], [100, 0], [100, 100], [0, 60]];
	    var ministry3Small = [[0, 20], [100, 0], [100, 100], [0, 100]];
	    var quote = [[100, 70], [0, 0], [0, 100]];
	    var quoteSmall = [[0, 0], [100, 30], [100, 70], [0, 100]];
	    var slope = [[0, 0], [100, 20], [100, 100], [0, 100]];
	    var slopeSmall = [[0, 0], [100, 10], [100, 100], [0, 100]];
	    var current_width = $(window).width();
		if (current_width < 640){
			$('.ministry-introductions .welcome').clipPath(welcomeSmall, {
				isPercentage: true,
				svgDefId: 'welcomesmallSvg'
			});
			$('.ministry-introductions .ministry-1').clipPath(ministry1Small, {
				isPercentage: true,
				svgDefId: 'ministry1smallSvg'
			});
			$('.ministry-introductions .ministry-2').clipPath(ministry2Small, {
				isPercentage: true,
				svgDefId: 'ministry2smallSvg'
			});
			$('.ministry-introductions .ministry-3').clipPath(ministry3Small, {
				isPercentage: true,
				svgDefId: 'ministry3smallSvg'
			});
			$('.ministry-introductions .quote').clipPath(quoteSmall, {
				isPercentage: true,
				svgDefId: 'quotesmallSvg'
			});
			$('.slope-page').clipPath(slopeSmall, {
				isPercentage: true,
				svgDefId: 'slopesmallSvg'
			});
		} else {
			$('.ministry-introductions .welcome').clipPath(welcome, {
				isPercentage: true,
				svgDefId: 'welcomeSvg'
			});
			$('.ministry-introductions .ministry-1').clipPath(ministry1, {
				isPercentage: true,
				svgDefId: 'ministry1Svg'
			});
			$('.ministry-introductions .ministry-2').clipPath(ministry2, {
				isPercentage: true,
				svgDefId: 'ministry2Svg'
			});
			$('.ministry-introductions .ministry-3').clipPath(ministry3, {
				isPercentage: true,
				svgDefId: 'ministry3Svg'
			});
			$('.ministry-introductions .quote').clipPath(quote, {
				isPercentage: true,
				svgDefId: 'quoteSvg'
			});
			$('.slope-page').clipPath(slope, {
				isPercentage: true,
				svgDefId: 'slopeSvg'
			});
    	}

	}

	$(document).ready(clippathPolyfill);

	$(window).resize(clippathPolyfill);

	// slick slider

	$('.homepage-slider').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1
		// adaptiveHeight: true
	});

	// $('#lightgallery').lightGallery();

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
	            $('.spinner').hide();
	            $('#ajax-contact').each(function (){
					this.reset();
				});
	        } else {
	            $('#error').fadeIn();
	            $('#thanks').fadeOut();
	            $('#spinner').hide();
	        }
	    });
	});

	// hide maps overlay when clicked

	$('.google-map-overlay').on('click', function () {
		$(this).toggleClass('hide');
		return false;
	});

})(jQuery);