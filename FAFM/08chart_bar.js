var bar = {
	_itens : [],
	_item : [],
	_dir : '',
	_showTxt : false,
	_ids : [],
	_txts : [],
	_T : 0,
	_animaTime : 1400,
	setAnimaTime : function(tempo){
		bar._animaTime = tempo;
	},
	init : function(itens, direcao, showTexto) {
		bar._dir = direcao;
		bar._showTxt = showTexto;
		$.each(itens, function(index, value){
			bar._itens.push( value.join() );
		});
		for ( i = 0; i < bar._itens.length; i++ ){
			bar._item = bar._itens[i].split(',');
			bar.processa();
		}
		bar._T = setTimeout('bar.escreve()', 600);
	},
	processa : function(){ 
		var id = bar._item[0];
		var tam = bar._item[1]
		var cor = bar._item[2];
		if ( bar._showTxt ){
			bar._ids.push(id);
			bar._txts.push(tam+'%');
		}
		$('#'+id).css('background-color', cor);
		if ( bar._dir == 'horizontal' ){
			$('#'+id).css('width', 0);
			$('#'+id).animate( {'width': tam+'%'}, bar._animaTime);
		}else{
			$('#'+id).css('height', 0);
			$('#'+id).animate( {'height':tam+'%'}, bar._animaTime);
		}
	},
	escreve : function(){
		if ( bar._showTxt ){
			for ( i = 0; i < bar._ids.length; i++ ){
				$('#'+bar._ids[i]).html('<span>'+bar._txts[i]+'</span>');
			}
		}
	},
};
