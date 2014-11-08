(function() {
    $(document).ready(function() {

	// Initialize DOM elements

	
	// Initialize nav object for manipulating the nav.
	var nav = new Nav();
	
	function Nav() {
	    var $nav = $("nav");
	    var $next = $nav.next();
	    var position = $nav.offset().top;
	    this.atTop = function() {
		var docViewTop = $(window).scrollTop();
		return (position <= docViewTop);
	    };
	    this.stick = function() {
		$nav.addClass("stuck");
		$next.attr("style", "padding-top: " + $nav.outerHeight() + "px");
	    };
	    this.unstick = function() {
		$nav.removeClass("stuck");
		$next.removeAttr("style");
	    };
	    this.refreshPosition = function() {
		if (this.atTop()) {
		    position = $next.offset().top;
		} else {
		    position = $nav.offset().top;
		}
	    };
	};

	$(window).on("resize orientationChanged", function() {
	    // Reposition nav on window resize or orientation change
	    nav.refreshPosition();
	    if (nav.atTop()) {
		nav.stick();
	    } else {
		nav.unstick();
	    }
	});

	
	$(window).on("scroll", function() {
	    // Stick nav to top when page scrolls to a point at or below the
	    // natural nav position
	    if (nav.atTop()) {
		nav.stick();
	    } else {
		nav.unstick();
	    }
	});
    });    
})();
