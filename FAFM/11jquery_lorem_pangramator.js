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
			var f = 'Luís argüia à Júlia que \"brações, fé, chá, óxido, pôr, zângão\" eram palavras do português. ';
			f += 'A famosa Kelly comeu pão infectado com arroz que Barriga jantou, vendo o filme da Wermatch xexelenta. ';
			f += 'À noite, vovô Kowalsky vê o ímã cair no pé do pinguim queixoso e vovó põe açúcar no chá de tâmaras do jabuti feliz.';
			return f;
		}
		function langEN(){
			var f = 'The quick brown fox jumps over the lazy dog. ';
			// --- want some more? insert by yourself;
			return f;
		}
		function langDE(){
			var f = 'Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich.';
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
