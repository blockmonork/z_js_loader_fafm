/*
	jQuery Slideshow Plugin
*/

(function( $ ){
    $.fn.crossfadeImg = function(settings){
		// settings
		var config = {
			'delay': 2000,
			'fadeSpeed': 500
		};
		if ( settings ){$.extend(config, settings);}

		// variables
		var img = this.children('img');
		var count = img.length;
		var i = 0;

		// show first image
		img.eq(0).show();

		// run slideshow
		init();
		function init(){
			setInterval(function(){
				img.eq(i).fadeOut(parseInt(config.fadeSpeed));
				i = ( i+1 == count ) ? 0 : i+1;
				img.eq(i).fadeIn(parseInt(config.fadeSpeed));
				}, parseInt(config.delay));
		};
	};
})(jQuery);
