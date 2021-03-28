var fafmModulos = {
	debug_mode:true,
	debug_txt:'',
	mod_default: ['00fafm.css', '01jquery_1_9_1.js', '02jquery_mask.js', '03jquery_scrollTo.js', '04jquery_prettynumber.js', '05jquery_gradient.js', '06base64.js', '07fafm.js', '08chart_bar.js', '09ws_cookie.js', '10placeholder.js', '11jquery_lorem_pangramator.js', '12gramaptcha_jquery.js', '13data_funcs.js'],
	mod_gallery: ['crossfadeimg-jquery_crossfade_img.css', 'crossfadeimg-jquery_crossfade_img.js', 'simpleimageviewer-simple_image_viewer.css', 'simpleimageviewer-simple_image_viewer.js'],
	mods:[],
	Temp:'',
	C:'',
	FLD:'FAFM/',
	_trim:function(txt){ if ( txt == '' || txt == null || txt == undefined ){return ''; }else{return txt.replace(/^\s+|\s+$/g, "");}},
	toJs:function(x){
		return '<script type="text/javascript" src="'+x+'"></script>';
	},
	toCss:function(x){
		return '<link rel="stylesheet" type="text/css" media="all" href="'+x+'" />';
	},
	getModulos:function(valores){ 
		if ( typeof valores == 'object' ){
			for ( i = 0; i < valores.length; i++ ){
				this.extractMod(valores[i]);
			}
		}else{
			this.extractMod(valores);
		}
		this.stringToArray();
		return this.mods;
	},
	stringToArray:function(){
		var A = this.Temp.split(',');
		for ( i = 0; i < A.length; i++ ){
			x = this._trim(A[i]);
			if ( x != '' ){
				this.mods.push(x);
			}
		}
	},
	extractMod:function(_arrai){
		var arrai = eval('this.mod_'+_arrai+'.toString();');
		this.Temp += arrai + ',';
	},
	subDir:function(F) { 
		return ( F.indexOf('-') != -1 )
			? F.replace(/-/g, '/')
			: F;
	},
	fLoaderEngine:function(_f, _d){ 
		if ( typeof _f == 'object'){
			for(i=0; i<_f.length; i++){
				// --- se subdir em FAFM...
				var a = this.subDir(_f[i]);
				var _y = _d+this.FLD+a;
				this.debug_txt += _y + '<br>';
				var _j = ( a.search('.js') != -1 );
				var tmp = ( _j ) ? this.toJs(_y) : this.toCss(_y);
				this.C += tmp;
			}
		}else{ 
			// --- se subdir em FAFM...
			var a = this.subDir(_f);
			var _y = _d+this.FLD+a;
			this.debug_txt = _y;
			var _j = ( a.search('.js') != -1 ); 
			this.C = ( _j ) ? this.toJs(_y) : this.toCss(_y);
		}
		if ( this.debug_mode ){
			db  ='fafmModulos::Debug Mode On<br>';
			db += 'Modulos carregados:<br>';
			db += this.debug_txt + '<br>';
			x = document.createElement('div');
			x.innerHTML = '<p style="text-align:center; font-size:13px; color:darkblue;">'+db+'</p>';
			x.style.display = 'block';
			x.style.width = '500px';
			x.style.margin = '0 auto';
			x.style.backgroundColor = '#fff';
			document.body.appendChild(x);
		}
		document.write( this.C ); 
	},
	loader:function(f, d){ 
		this.fLoaderEngine(this.getModulos(f), d);
	},
}
function _fLoadOut()
{ 
	var x = _fLoadOut.arguments; 
	var _f = ( x[0] || ''); 
	var _d = ( x[1] || ''); 
	if ( _d != '' ) { 
		if ( _d.charAt(_d.length-1) != '/' ) { 
			_d += '/'; 
		}
	}
	if ( _f == '' ) return; 
	if ( typeof _f == 'object'){ 
		var c = ''; 
		for(i=0; i<_f.length; i++){
			a = _f[i]; 
			_y = _d+a; 
			var _j = ( a.search('.js') != -1 ); 
			tmp = ( _j ) 
				? '<script type="text/javascript" src="'+_y+'"></script>' 
				: '<link rel="stylesheet" type="text/css" href="'+_y+'" media="all" />'; 
				c += tmp; 
		}
	}else{ 
		_y = _d+_f; 
		var _j = ( _f.search('.js') != -1 ); 
		var c = ( _j ) 
			? '<script type="text/javascript" src="'+_y+'"></script>' 
			: '<link rel="stylesheet" type="text/css" href="'+_y+'" media="all" />'; 
	} 
	document.write( c ); 
}
function _fLoad()
{ 
	var x = _fLoad.arguments; 
	var _f = ( x[0] || ''); 
	var _d = ( x[1] || ''); 
	if ( _d != '' ) { 
		if ( _d.charAt(_d.length-1) != '/' ) {
			_d += '/'; 
		}
	}
	if ( _f == '' ){ 
		return; 
	}else{
		fafmModulos.loader(_f, _d);
	}
}
