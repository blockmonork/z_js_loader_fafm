(function($){
	$.fn.loremPangramator = function(settings){
		var config = {
			lang: 'Portuguese',
			rows:5,
			align:'justify',
			showRowNumber:true,
		};
		if ( settings ) { $.extend(config, settings); }
		function langPT(){
			var f = 'Lu�s arg�ia � J�lia que \"bra��es, f�, ch�, �xido, p�r, z�ng�o\" eram palavras do portugu�s. ';
			f += 'A famosa Kelly comeu p�o infectado com arroz que Barriga jantou, vendo o filme da Wermatch xexelenta. ';
			f += '� noite, vov� Kowalsky v� o �m� cair no p� do pinguim queixoso e vov� p�e a��car no ch� de t�maras do jabuti feliz.';
			return f;
		}
		function langEN(){
			var f = 'The quick brown fox jumps over the lazy dog. ';
			// --- want some more? insert by yourself;
			return f;
		}
		function langDE(){
			var f = 'Victor jagt zw�lf Boxk�mpfer quer �ber den gro�en Sylter Deich.';
			return f;
		}
		var pa = '<p align="'+config.align+'">';
		var pf = '</p>';
		switch ( config.lang ){
			case 'Portuguese':
				Cnt = langPT();
			break;
			case 'English':
				Cnt = langEN();
			break;
			case 'Deutsche':
				Cnt = langDE();
			break;
		}
		var txt = '';
		for ( i = 1; i <= config.rows; i++ ){
			x = ( config.showRowNumber ) ? i+'. ' : '';
			txt += pa+x+Cnt+pf;
		}
		this.html(txt);
	};
})(jQuery);
