/* http://tympanus.net/codrops/2010/01/03/prettynumber-a-jquery-plugin-for-formatting-numbers/
<div id="number1">1234567123672</div>
<div id="number2">12345622237123672</div>
a) $("#number1").prettynumber(); //it would output 1.234.567.123.672
b) $("#number2").prettynumber({ delimiter : ',' }); //it would output 12,345,622,237,123,672
*/
(function($) {
	$.fn.prettynumber = function(options) {
		var opts = $.extend({}, $.fn.prettynumber.defaults, options);
		return this.each(function() {
			$this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var str = $this.html();
			$this.html($this.html().toString().replace(new RegExp("(^\\d{"+($this.html().toString().length%3||-1)+"})(?=\\d{3})"),"$1"+o.delimiter).replace(/(\d{3})(?=\d)/g,"$1"+o.delimiter));
		});
	};
	$.fn.prettynumber.defaults = {
		delimiter       : '.'	
	};
})(jQuery);