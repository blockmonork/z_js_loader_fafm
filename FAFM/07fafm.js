function fafmMenu(){this.suit=function(e,t,n){for(i=0;i<=n;i++){if(i==t){if($("#"+e+t).is(":visible")){$("#"+e+t).hide("slow")}else{$("#"+e+t).show("slow")}}else{$("#"+e+i).hide("slow")}}};this.suit_slide=function(e,t,n){for(i=0;i<=n;i++){if(i==t){if($("#"+e+t).is(":visible")){$("#"+e+t).slideUp("slow")}else{$("#"+e+t).slideDown("slow")}}else{$("#"+e+i).slideUp("slow")}}}}$(document).ready(function(){if(!Number.toFixed){Number.prototype.toFixed=function(e){var t=this;t=Math.round(t*Math.pow(10,e))/Math.pow(10,e);return t}}});var fafm={versao:2,last_rev:"2014-07-08",get_versao:function(){return this.versao},get_last_rev:function(){return this.last_rev},array_remove:function(e,t,n){return e.splice(t,n)},array_insert:function(e,t,n){return e.splice(t,0,n)},array_replace:function(e,t,n){var r=e.indexOf(t);if(r!=-1){this.array_remove(e,r,1);this.array_insert(e,r,n)}},array_item_existsOLD:function(e,t){return e.indexOf(t)!=-1},array_item_exists:function(e,t){t=this.trim(t);for(i=0;i<e.length;i++){temp=this.trim(e[i]);if(temp==t){return true;break}}return false},auto_focus:function(e){this.id(e).focus()},auto_val:function(e,t){if(e.value==t){e.value=""}else{if(e.value==""){e.value=t}}},format_float_val:function(e){if(e!=""){a=this.replace_all(e,".","*");b=this.replace_all(a,",",".");c=this.replace_all(b,"*","");if(isNaN(c)){return false}else{return c}}return false},format_moeda:function(e,t){return parseFloat(parseFloat(e).toFixed(t))},get_attribute:function(objetoId,atributo){var temp=eval('document.getElementById("'+objetoId+'").'+atributo);if(temp==undefined||temp==null){temp=eval('document.getElementById("'+objetoId+'").getAttribute("'+atributo+'");');return temp==undefined||temp==null?null:temp}else{return temp}},get_prop:function(e,t){return},id:function(){var e=this.id.arguments;var t=e[0]||null;var n=e[1]||null;if(t==null)return;if(n!=null){if(!$){document.getElementById(t).innerHTML=n}else{$("#"+t).html(n)}}else{return!$?document.getElementById(t):$("#"+t)}},insert_value:function(e,t){document.getElementById(e).value=t},is_array:function(e){return typeof e=="object"},is_cnpj:function(e){var t=e;var n="";if(t.length<18){n+="� necessario preencher corretamente o n�mero do CNPJ! \n\n"}if(t.charAt(2)!="."||t.charAt(6)!="."||t.charAt(10)!="/"||t.charAt(15)!="-"){n+="� necess�rio preencher corretamente o n�mero do CNPJ! \n\n"}if(document.layers&&parseInt(navigator.appVersion)==4){x=t.substring(0,2);x+=t.substring(3,6);x+=t.substring(7,10);x+=t.substring(11,15);x+=t.substring(16,18);t=x}else{t=t.replace(".","");t=t.replace(".","");t=t.replace("-","");t=t.replace("/","")}var r=/\D/;if(r.test(t)){n+="A verifica��o de CNPJ suporta apenas n�meros! \n\n"}var s=[];var o=new Number;var u=[6,5,4,3,2,9,8,7,6,5,4,3,2];for(i=0;i<12;i++){s[i]=t.charAt(i);o+=s[i]*u[i+1]}if((x=o%11)<2){s[12]=0}else{s[12]=11-x}o=0;for(y=0;y<13;y++){o+=s[y]*u[y]}if((x=o%11)<2){s[13]=0}else{s[13]=11-x}if(t.charAt(12)!=s[12]||t.charAt(13)!=s[13]){n+="D�gito verificador com problema!"}if(n!=""){alert(n)}return n!=""?false:true},is_cpf:function(e){var t=e;var n=false;var r;var i=this._internal_formata_cpf(t);if(i==""){return n}var t=i.substr(0,9);var s=i.substr(9,2);var o=0;for(r=0;r<9;r++){o+=t.charAt(r)*(10-r)}if(o==0){alert("Digito verificador errado");return n}o=11-o%11;if(o>9)o=0;if(s.charAt(0)!=o){alert("Digito verificador errado");return n}o*=2;for(r=0;r<9;r++){o+=t.charAt(r)*(11-r)}o=11-o%11;if(o>9)o=0;if(s.charAt(1)!=o){alert("CPF incorreto");return n}var u=Array("1","2","3","4","5","6","7","8","9");var a=0;for(var f=0;f<u.length;f++){for(var l=0;l<11;l++){if(t.charAt(l)==u[f]){a++}}}if(a==9){alert("Sequencia de numeros no CPF invalida");return n}else{return true}},is_email:function(e){var t=/^[a-z0-9]+([_.+-][a-z0-9]+)*\@[a-z0-9]+([.-][a-z0-9]+)*([.]([a-z0-9]{2,4}|[0-9]{1,3}))+$/i;if(!t.test(e)){return false}return true},is_number:function(e){return!isNaN(e)},max_length:function(e,t,n,r){var i=t-1-e.value.length;if(e.value.length>=t){e.value=e.value.substring(0,t-1)}if(n){document.getElementById(r).innerHTML=i}},get_browser:function(){var e,t=navigator.userAgent;if(t.indexOf("Chrome")>-1){e="Chrome"}else if(t.indexOf("Safari")>-1){e="Safari"}else if(t.indexOf("Opera")>-1){e="Opera"}else if(t.indexOf("Firefox")>-1){e="Mozilla"}else if(t.indexOf("MSIE")>-1){e="IE"}else{e="undefined"}return e},valida_form_fields:function(){var A=this.valida_form_fields.arguments;var fields=A[0]||null;var form_name=A[1]||0;if(fields==null){alert("valida_form_fields:Fields==null");return}var f=document.forms[form_name];if(this.is_array(fields)){for(i=0;i<fields.length;i++){var temp=eval("f."+fields[i]);if(temp.value==""){alert("preencha o campo");temp.focus();return false;break}}return true}else{if(eval("f."+fields+".value")==""){alert("preencha o campo");eval("f."+fields).focus();return false}return true}},screen_size:function(e){return e=="w"?screen.width:screen.height},redir:function(e){window.location.href=e},popup:function(){var e=this.popup.arguments;var t=e[0]||null;if(t==null){alert("this.popup()::param.pagina obrigatorio");return}var n=e[1]||"";var r=e[2]||"";var i=e[3]||0;var s=e[4]||0;var o=e[5]||0;var u=e[6]||0;w=window.open(t,n,r);w.moveTo(i,s);if(o!=0&&u!=0){w.resizeTo(o,u)}},replace_all:function(e,t,n){var r="";for(i=0;i<e.length;i++){c=e.charAt(i);r+=c==t?n:c}return r},preg_replace:function(e,t,n){return n.replace(new RegExp(e,"g"),t)},preg_replace_i:function(e,t,n){return n.replace(new RegExp(e,"gi"),t)},trim:function(e){if(e==""||e==null||e==undefined){return""}else{return e.replace(/^\s+|\s+$/g,"")}},safe_data:function(e){return escape(this.trim(e))},set_prop:function(e,t,n){return},set_attribute:function(objetoId,atributo,valor){eval('document.getElementById("'+objetoId+'").setAttribute("'+atributo+'", "'+valor+'");')},remove_attribute:function(objetoId,atributo){eval('document.getElementById("'+objetoId+'").removeAttribute("'+atributo+'");')},input:function(e,t){x=e=="enable"?false:true;this._internal_imput(t,x)},tab:function(e,t,n){var r=e.value.length;var i=this.get_browser()=="IE"?r-1:r;if(i==t-1)this.id(n).focus()},ajax:function(){var x=this.ajax.arguments;var div_load=x[0]||null;var alvo=x[1]||null;var div_loader=x[2]||false;var completo=x[3]||false;if(div_load==null||alvo==null){alert("fafm.ajax() erro: div_load && alvo required");return}if(div_loader){$("#"+div_loader).show()}if(completo){if(div_loader){$("#"+div_load).load(alvo,function(){$("#"+div_loader).hide();eval(completo)})}else{$("#"+div_load).load(alvo,function(){eval(completo)})}}else{if(div_loader){$("#"+div_load).load(alvo,function(){$("#"+div_loader).hide()})}else{$("#"+div_load).load(alvo)}}},suit:function(){var e=this.suit.arguments;el=e[0]||false;if(!el){return}speed=e[1]||"slow";$(el).toggle(speed)},showBoxes:function(){var e=this.showBoxes.arguments;var t=e[0]||false;var n=e[1]||"slow";$(".show_boxes").bind("click",function(){var e=$(this).attr("data-target");var r=$(".show_boxes_container").children();$.each(r,function(r,i){var s=i.id;if(s==e){if($("#"+s).is(":visible")){if(t){$("#"+s).fadeOut(n)}else{$("#"+s).slideUp(n)}}else{if(t){$("#"+s).fadeIn(n)}else{$("#"+s).slideDown(n)}}}else{if(t){$("#"+s).fadeOut(n)}else{$("#"+s).slideUp()}}})})},getDocHeight:function(){var e=document;return Math.max(Math.max(e.body.scrollHeight,e.documentElement.scrollHeight),Math.max(e.body.offsetHeight,e.documentElement.offsetHeight),Math.max(e.body.clientHeight,e.documentElement.clientHeight))},encode:function(e){return Base64.encode(this.trim(e))},decode:function(e){return Base64.decode(this.trim(e))},_internal_formata_cpf:function(e){var t="";if(e.charAt(3)!="."||e.charAt(7)!="."||e.charAt(11)!="-"){alert("Preencha corretamente o campo CPF: xxx.xxx.xxx-xx");return t}else{var n=e.substring(0,3);n+=e.substring(4,7);n+=e.substring(8,11);n+=e.substring(12,14);return n}},get_hash:function(){var e=this.get_hash.arguments;var t=e[0]||false;if(!t){return this._internal_get_hash()}else{var n="";for(i in t){if(i=="hash"){n=t[i];break}}return n.toString().replace("#","")}},get_hash_props:function(){var e=this.get_hash_props.arguments;var t=e[0]||false;if(t){return location[t]}var n="";for(x in location){n+=x+" = "+location[x]+"<br>"}return n},get_hash_from_url:function(e){if(e.indexOf("#")==-1)return"";x=e.split("#");y=x[1];return y.toString().replace("#","")},_internal_get_input:function(e){var t=document.getElementsByTagName("INPUT");for(i=0;i<t.length;i++){el=t[i];for(atr in el){if(atr=="id"){if(el[atr]==e){return el;break}}}}return null},_internal_imput:function(e,t){elem=this._internal_get_input(e);for(atr in elem){if(atr=="disabled"){if(t){elem[atr]=true}else{elem[atr]=false}break}}},_internal_get_hash:function(){return location.hash.toString().replace("#","")}};var fafmMenu=new fafmMenu