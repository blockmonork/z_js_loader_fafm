/*
gramaptcha_jquery plugin
By FAFM - bombrain.com.br
*/
(function($){
	$.fn.gramaptcha = function(settings){
		var config = {
			inputId:'gramaptcha',
			hiddenId:'v',
			outerBoxClass:'',
			isDebug:false,
			theItens: ['Eu', 'Tu', 'Ele', 'Nós', 'Vós', 'Eles'],
		};
		if ( settings ) { $.extend(config, settings); }
		var pessoa = '';
		var tagInput = '<input type="text" style="display:inline;" size="4" maxlength="4" required name="'+config.inputId+'" id="'+config.inputId+'">';
		var tagHid = '<input type="hidden" name="'+config.hiddenId+'" id="'+config.hiddenId+'" value="%">';
		var linha = '';
		var estilo = '';
		function sorteio(){
			var t = config.theItens.length-1;
			var x = Math.floor((Math.random() * t));
			pessoa = config.theItens[x];
			if ( config.isDebug ){
				alert('gramaptcha.isDebug::pessoa: ' + pessoa);
			}
		};
		sorteio();
		for ( i = 0; i < config.theItens.length; i++ ){
			var p = config.theItens[i];
			if ( p != pessoa ){
				linha += p + ', ';
			}else{
				linha += tagInput + ', ';
				x = tagHid.replace('%', pessoa);
				linha += x;
			}
		}
		linha = linha.substr(0, linha.length-2);
		estilo = ( config.outerBoxClass != '' )
			? ' class="'+config.outerBoxClass+'" '
			: ' style="display:inline; max-width:200px; padding:2px; border:1px dotted black; background:white;" ';
		this.html('<div '+estilo+'>'+linha+'</div>');
	};
})(jQuery);