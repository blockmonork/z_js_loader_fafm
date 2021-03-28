// http://www.w3schools.com/html/html5_webstorage.asp
var ws = {
	isSession : false,
	set : function(k, v) { 
		if ( !this.isSession ){
			localStorage.setItem(k,v);
		}else{
			sessionStorage.setItem(k,v);
		}
	},
	get : function(k) { 
		if ( !this.isSession ){
			return (localStorage.getItem(k)|| false);
		}else{
			return (sessionStorage.getItem(k)|| false);
		}
	},
	size : function() { 
		if ( !this.isSession ){
			return localStorage.length;
		}else{
			return sessionStorage.length;
		}
	},
	clear : function() {
		if ( !this.isSession ){
			for ( a in localStorage ) { 
				ws.set(a, ''); 
				localStorage.removeItem(a);
			}
			localStorage.clear();
		}else{
			for ( a in sessionStorage ) { 
				ws.set(a, ''); 
				sessionStorage.removeItem(a);
			}
			sessionStorage.clear();
		}
	}
};
//http://www.w3schools.com/js/js_cookies.asp
var cuk = {
	path_padrao : 'path=/',
	set : function(){
		var A = this.set.arguments;
		var nome = ( A[0] || false );
		if ( !nome ) return;
		var valor = ( A[1] || '' );
		var expira = ( A[2] || 365 );
		var cam = ( A[3] || this.path_padrao );
		this._criaCookie(nome, valor, expira, cam);
	},
	get : function(nome){
		var name = nome + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return false;
	},
	clear : function(nome){
		document.cookie = nome+"=; expires=Thu, 31 Jan 1970 00:00:00 GMT"; 
	},
	_criaCookie : function(nome, valor, expira, caminho){
		var d = new Date();
		d.setTime(d.getTime()+(expira*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = nome + "=" + valor + "; " + expires + '; ' + caminho;
	},
}

