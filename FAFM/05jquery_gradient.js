/*
* gradient (jQuery CSS3 gradient)
* reference: http://www.w3schools.com/css/css3_gradients.asp
* dependencias: jQuery (vs.tested 1.9.1) | fafm.trim
*/
(function( $ ){
	$.fn.gradient = function(settings) {
		var debug = false;
		var debug_txt = '';
		var config = {
			'mode' : 'linear', // ou radial
			'degrees':false,
			'repeating' : false,
			'direction' : 'top', //top to bottom
            'colors' : 'white, black',
			'radialCenter':'', // padrao: centro ou 50%, 50% ou px-width, px-height 
			'radialSize':4,
			'keepAtualElemetStyle':true,
        };
		//radial-gradient(center, shape size, start-color, ..., last-color);
		var radial_size = [ 'closest-side', 'farthest-side', 'closest-corner', 'farthest-corner' ]; // 0-MaisProxCentro, 3-MaisProxBorda[padrao]
		var std_inverse = {
			'top':'bottom',
			'right':'left',
			'bottom':'top',
			'left':'right',
		};
		if ( settings ){$.extend(config, settings);}
		var Params = '';
		var Style = '';
		var OriginalStyle = '';
		function radial_params(){
			x = '';
			if ( config.radialCenter != '' ) x = config.radialCenter + ', ';
			x += radial_size[config.radialSize-1] + ', ';
			return x;
		};
		//--- directions:
		function translate_dir(modo, nav){
			if ( config.direction == '' || config.degrees) return '';
			_dir = '';
			if ( modo == 'radial' ) return radial_params();
			temp = config.direction;
			temp = temp.toString();
			if ( temp.indexOf(' ') != -1 ){
				x = temp.split(' ');
				d1 = fafm.trim(x[0]);
				d2 = fafm.trim(x[1]);
			}else{
				d1 = fafm.trim(temp);
				d2 = '';
			}
			if ( nav == 'std' ){
				_dir = 'to ' + std_inverse[d1];
				if ( d2 != '' ){
					_dir += ' ' + std_inverse[d2];
				}
			}else{
				_dir = d1;
				if ( d2 != '' ){
					_dir += ' ' +d2;
				}
			}
			_dir += ', ';
			return _dir;
		};
		function get_gradient( modo, P ){
			x  = 'background: -webkit-'+modo+'-gradient('+translate_dir(modo, 'safari')+P+'); '; //For Safari 5.1 to 6.0 
			x += 'background: -o-'+modo+'-gradient('+translate_dir(modo, 'opera')+P+');  '; //For Opera 11.1 to 12.0 
			x += 'background: -moz-'+modo+'-gradient('+translate_dir(modo, 'firefox')+P+');  '; //For Firefox 3.6 to 15 
			x += 'background: '+modo+'-gradient('+translate_dir(modo, 'std')+P+');  '; //Standard syntax 
			return x;
		}
		Params = config.colors;
		Style = get_gradient( (( config.repeating ) ? 'repeating-'+config.mode : config.mode), Params);
		if ( this.attr('style') ){
			if ( config.keepAtualElementStyle ){
				OriginalStyle = this.attr('style') + ' ';
			}else{
				this.attr('style', '');
			}
		}
		this.attr('style', OriginalStyle + Style);
		if ( debug ){
			debug_txt = 'OriginalStyle('+OriginalStyle + ')<br>PluginStyle('+Style+')';
			this.html(debug_txt);
		}
	};
})( jQuery );
