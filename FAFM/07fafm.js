/****
	FAFM_js_lib
****/
$(document).ready(function() { if (!Number.toFixed) { Number.prototype.toFixed=function(x) { var temp=this; temp=Math.round(temp*Math.pow(10,x))/Math.pow(10,x); return temp; } } });/*window.onload=___;*/

var fafm = {
	versao:2,
	last_rev:'2014-07-08',
	get_versao:function(){ return this.versao; },
	get_last_rev:function(){ return this.last_rev; },
	array_remove : function(arr, start, end) { return arr.splice(start, end); },
	array_insert : function(arr, pos, item) { return arr.splice(pos, 0, item); },
	array_replace : function(arr, searchTo, replaceTo) { var pos = arr.indexOf(searchTo); if ( pos != -1 ) { this.array_remove(arr, pos, 1); this.array_insert(arr, pos, replaceTo); }},
	
	array_item_existsOLD : function(arr, item) { return ( arr.indexOf(item) != -1 ); },
	array_item_exists : function(arr, item) {
		item = this.trim(item);
		for ( i = 0; i < arr.length; i++ ){
			temp = this.trim(arr[i]);
			if ( temp == item ){
				return true;
				break;
			}
		}
		return false;
	},
	auto_focus : function(elId){ this.id(elId).focus(); },
	auto_val : function(objeto, valorPadrao){ if ( objeto.value == valorPadrao ) { objeto.value = '';} else { if ( objeto.value == '' ) { objeto.value = valorPadrao; } } },
	
	format_float_val : function (vlr){ if ( vlr != '' ){ a = this.replace_all(vlr, '.', '*'); b = this.replace_all(a, ',', '.'); c = this.replace_all(b, '*', ''); if ( isNaN(c) ){ return false; }else{ return c; } } return false; },
	
	format_moeda : function(valor, precisao){ return parseFloat(parseFloat(valor).toFixed(precisao)); },
	get_attribute : function(objetoId, atributo){ var temp = eval('document.getElementById("'+objetoId+'").'+atributo); if ( temp == undefined || temp == null ){ temp = eval('document.getElementById("'+objetoId+'").getAttribute("'+atributo+'");'); return ( temp == undefined || temp == null ) ? null : temp; }else{ return temp; } },
	
	get_prop : function(objeto, atributo){ /*To-Do*/ return; },
	id : function(){ var x = this.id.arguments; var i = (x[0] || null); var v = (x[1] || null); if ( i == null ) return; if ( v != null ) {  if ( !$ ) {  document.getElementById(i).innerHTML = v;  }else{ $('#'+i).html(v); } }else{ return ( !$ ) ? document.getElementById(i) : $('#'+i); } },
	
	insert_value : function(elemId, valor){ document.getElementById(elemId).value=valor; },
	is_array : function(o){ return ( typeof o == 'object' ); },
	
	is_cnpj : function(cnpj){ var CNPJ = cnpj; var erro = ""; if (CNPJ.length < 18){ erro += "É necessario preencher corretamente o número do CNPJ! \n\n"; } if ((CNPJ.charAt(2) != ".") || (CNPJ.charAt(6) != ".") || (CNPJ.charAt(10) != "/") || (CNPJ.charAt(15) != "-")){ erro += "É necessário preencher corretamente o número do CNPJ! \n\n"; } if (document.layers && parseInt(navigator.appVersion) == 4){ x = CNPJ.substring(0,2); x += CNPJ. substring (3,6); x += CNPJ. substring (7,10); x += CNPJ. substring (11,15); x += CNPJ. substring (16,18); CNPJ = x; } else { CNPJ = CNPJ. replace (".",""); CNPJ = CNPJ. replace (".",""); CNPJ = CNPJ. replace ("-",""); CNPJ = CNPJ. replace ("/",""); } var nonNumbers = /\D/; if (nonNumbers.test(CNPJ)) { erro += "A verificação de CNPJ suporta apenas números! \n\n"; } var a = []; var b = new Number; var c = [6,5,4,3,2,9,8,7,6,5,4,3,2]; for (i=0; i<12; i++){ a[i] = CNPJ.charAt(i); b += a[i] * c[i+1]; } if ((x = b % 11) < 2) { a[12] = 0; } else { a[12] = 11-x; } b = 0; for (y=0; y<13; y++) { b += (a[y] * c[y]); } if ((x = b % 11) < 2) { a[13] = 0; } else { a[13] = 11-x; }
      if ((CNPJ.charAt(12) != a[12]) || (CNPJ.charAt (13) != a[13])){ erro +="Dígito verificador com problema!"; } if (erro != ""){ alert(erro); } return (erro != "") ? false : true; }, 
	  
	is_cpf : function(cpf){	var c = cpf; var nd = false; var i; var s = this._internal_formata_cpf(c); if (s == ""){ return nd; } var c = s.substr(0,9); var dv = s.substr(9,2); var d1 = 0; for (i = 0; i < 9; i++){ d1 += c.charAt(i)*(10-i); } if (d1 == 0){ alert("Digito verificador errado"); return nd; } d1 = 11 - (d1 % 11); if (d1 > 9) d1 = 0; if (dv.charAt(0) != d1) { alert("Digito verificador errado"); return nd; } d1 *= 2; for (i = 0; i < 9; i++) { d1 += c.charAt(i)*(11-i); } d1 = 11 - (d1 % 11); if (d1 > 9) d1 = 0; if (dv.charAt(1) != d1) { alert("CPF incorreto"); return nd; } var nums = Array("1", "2", "3", "4", "5", "6", "7", "8", "9"); var conta = 0; for (var a = 0; a < nums.length; a++){ for (var b = 0; b < 11; b++){ if (c.charAt(b) == nums[a]){ conta++; } } } if (conta == 9){ alert("Sequencia de numeros no CPF invalida"); return nd; }else{ return true; } },
	
	is_email : function(email){ var reg = /^[a-z0-9]+([_.+-][a-z0-9]+)*\@[a-z0-9]+([.-][a-z0-9]+)*([.]([a-z0-9]{2,4}|[0-9]{1,3}))+$/i; if (!reg.test(email)){return false;}return true;},
	
	is_number : function(x){ return ( !isNaN(x) ); },
	max_length : function(o, l, r, i){ var v = (l-1) - o.value.length; if (o.value.length >= l){ o.value = o.value.substring(0, l-1); } 	if (r){ document.getElementById(i).innerHTML = v; } },
	
	get_browser : function(){ var sBrowser, sUsrAg = navigator.userAgent; if(sUsrAg.indexOf("Chrome") > -1) { sBrowser = "Chrome"; } else if (sUsrAg.indexOf("Safari") > -1) { sBrowser = "Safari"; } else if (sUsrAg.indexOf("Opera") > -1) { sBrowser = "Opera"; } else if (sUsrAg.indexOf("Firefox") > -1) { sBrowser = "Mozilla"; } else if (sUsrAg.indexOf("MSIE") > -1) { sBrowser = "IE"; }else{ sBrowser = 'undefined'; } return sBrowser; },
	
	valida_form_fields : function(){ var A = this.valida_form_fields.arguments; var fields = A[0] || null; var form_name = A[1] || 0; if ( fields == null ) { alert('valida_form_fields:Fields==null'); return; } var f = document.forms[form_name]; if ( this.is_array(fields) ){
			for ( i=0; i < fields.length; i++ ){ var temp = eval('f.'+fields[i]); if ( temp.value == '' ){ alert('preencha o campo'); temp.focus(); return false; break; } } return true; }else{ if ( eval('f.'+fields+'.value') == '' ){ alert('preencha o campo'); eval('f.'+fields).focus(); return false; } return true; } },
			
	screen_size : function(d){ return ( d == 'w' ) ? screen.width : screen.height; },
	redir : function(p){ window.location.href=p; },
	
	popup : function(){ var A = this.popup.arguments; var pagina = (A[0] || null); if ( pagina == null ) { alert('this.popup()::param.pagina obrigatorio'); return; } var titulo = (A[1] || ''); var features = (A[2] || ''); var posMoveToX = (A[3] || 0); var posMoveToY = (A[4] || 0); var popResizeToW = (A[5] || 0); var popResizeToH = (A[6] || 0); w = window.open(pagina, titulo, features); w.moveTo(posMoveToX, posMoveToY); if ( popResizeToW != 0 && popResizeToH != 0 ) { w.resizeTo(popResizeToW, popResizeToH);}},
	
	replace_all : function(txt, alvo, novo){ var r = ''; for ( i = 0; i < txt.length; i++ ){ c = txt.charAt(i); r += ( c == alvo ) ? novo : c; } return r; },
	
	preg_replace : function(find, replace, str) { return str.replace(new RegExp(find, 'g'), replace); },
	
	preg_replace_i : function(find, replace, str) { return str.replace(new RegExp(find, 'gi'), replace); },
	
	trim : function(txt){ if ( txt == '' || txt == null || txt == undefined ){return ''; }else{return txt.replace(/^\s+|\s+$/g, "");}},
	safe_data: function(x){ return escape( this.trim(x) ); },
	set_prop : function(objeto, atributo, valor){ /*To-Do*/ return; },
	set_attribute : function(objetoId, atributo, valor){ eval('document.getElementById("'+objetoId+'").setAttribute("'+atributo+'", "'+valor+'");'); },
	
	remove_attribute : function(objetoId, atributo){ eval('document.getElementById("'+objetoId+'").removeAttribute("'+atributo+'");');},
	input : function(acao, id){ x = ( acao == 'enable') ? false : true; this._internal_imput(id, x); },
	tab : function(origem, tamanho, destino){ var o = origem.value.length; var T = ( this.get_browser() == 'IE' ) ? o-1 : o; if ( T == (tamanho-1) ) this.id(destino).focus(); },
	
	ajax : function(){ var x = this.ajax.arguments; var div_load = ( x[0] || null); var alvo = ( x[1] || null ); var div_loader = ( x[2] || false ); var completo = ( x[3] || false ); if ( div_load == null || alvo == null ) { alert('fafm.ajax() erro: div_load && alvo required'); return; } if ( div_loader ){ $('#'+div_loader).show(); } if ( completo ){ if ( div_loader ){ $('#'+div_load).load(alvo, function(){ 	$('#'+div_loader).hide(); eval(completo); }); }else{ $('#'+div_load).load(alvo, function(){ eval(completo); }); } }else{ if ( div_loader ){ $('#'+div_load).load(alvo, function(){ $('#'+div_loader).hide(); }); }else{ $('#'+div_load).load(alvo); } } },
	
	suit : function(){ var A = this.suit.arguments; el = ( A[0] || false ); if ( !el ) { return; } speed = ( A[1] || 'slow' ); $(el).toggle(speed); },
	
	showBoxes:function() { var A = this.showBoxes.arguments; var fade = ( A[0] || false ); var speed = ( A[1] || 'slow' ); $('.show_boxes').bind('click', function(){ var x = $(this).attr('data-target'); var $show_boxes_container = $('.show_boxes_container').children(); $.each($show_boxes_container, function(i, v){ var id = v.id; if ( id == x ){ if ( $('#'+id).is(':visible') ){ if ( fade ){ $('#'+id).fadeOut(speed); }else{ $('#'+id).slideUp(speed); } }else{ if ( fade ){ $('#'+id).fadeIn(speed); }else { $('#'+id).slideDown(speed); } } }else{ if ( fade ) { $('#'+id).fadeOut(speed); } else { $('#'+id).slideUp(); } } }); }); },	

	getDocHeight : function(){ var D = document; return Math.max( Math.max(D.body.scrollHeight, D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight)); },
	
	encode : function(vlr){ return Base64.encode(this.trim(vlr)); },
	decode : function(vlr){ return Base64.decode(this.trim(vlr)); },
	_internal_formata_cpf : function(c){ var nd = ""; if (c.charAt(3) != "." || c.charAt(7) != "." || c.charAt(11) != "-"){ alert("Preencha corretamente o campo CPF: xxx.xxx.xxx-xx"); return nd; }else{ var a = c.substring(0, 3); a += c.substring(4, 7); a += c.substring(8, 11); a += c.substring(12, 14); return a; }	},
	
	get_hash:function(){ var A = this.get_hash.arguments; var x = ( A[0] || false ); if ( !x ){ return this._internal_get_hash(); }else{ 	var a = ''; for ( i in x ){ if ( i == 'hash'){ a = x[i]; break; } } return a.toString().replace('#', ''); } },
	
	get_hash_props:function(){ var A = this.get_hash_props.arguments; var atr = ( A[0] || false ); if ( atr ){ return location[atr]; } var _hash = ''; for ( x in location ){ _hash += x + ' = ' + location[x] + '<br>'; } return _hash; },
	
	get_hash_from_url:function(_url){ if ( _url.indexOf('#') == -1 ) return ''; x = _url.split('#'); y = x[1]; return y.toString().replace('#', '') },
	/*internals*/
	_internal_get_input : function(id){ var els = document.getElementsByTagName("INPUT"); for ( i=0; i<els.length; i++){ el = els[i]; for ( atr in el ){ if ( atr == 'id' ){ if ( el[atr] == id ){ return el; break; } } } } return null; },
	
	_internal_imput : function(id, desabilitar){ elem = this._internal_get_input(id); for ( atr in elem ){ if ( atr == 'disabled' ){ if ( desabilitar ){ elem[atr] = true; }else{ elem[atr] = false; } break; } } },
	
	_internal_get_hash:function(){ return location.hash.toString().replace('#', ''); },
	
	
	
} /*** fafm End ***/	
function fafmMenu() { 
	this.suit = function(pr, id, tl) { for(i=0;i<=tl;i++){  if ( i == id ){ if ( $('#'+pr+id).is(':visible') ){$('#'+pr+id).hide('slow'); }else{$('#'+pr+id).show('slow'); } }else{ $('#'+pr+i).hide('slow'); } } }
	this.suit_slide = function(pr, id, tl) { for(i=0;i<=tl;i++){ if ( i == id ){ if ( $('#'+pr+id).is(':visible') ){$('#'+pr+id).slideUp('slow');}else{$('#'+pr+id).slideDown('slow');} }else{ $('#'+pr+i).slideUp('slow'); } } }
} var fafmMenu = new fafmMenu();