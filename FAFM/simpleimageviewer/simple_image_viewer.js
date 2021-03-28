function ImageViewer(){
	this.image_scheduled = false
	this.image = null
	this.loading = null
	this.shutter = null

	this.get_vieport_property_name = function(str){
		var n = '0';
		if (str == 'inner_height'){
			if (self.innerHeight) {
				n = 'window.innerHeight';
			}else if (document.documentElement && document.documentElement.clientHeight){
				n = 'document.documentElement.clientHeight';
			}
			else if (document.body){
				n = 'document.body.clientHeight';
			}
		}else if (str == 'inner_width'){
			if (self.innerWidth) {
				n = 'window.innerWidth';
			}else if (document.documentElement && document.documentElement.clientWidth){
				n = 'document.documentElement.clientWidth';
			}
			else if (document.body){
				n = 'document.body.clientWidth';
			}		
		}else if (str == 'scroll_left'){
			if (document.body && document.body.scrollLeft){
				n = 'document.body.scrollLeft';
			}else if (document.documentElement && document.documentElement.scrollLeft){
				n = 'document.documentElement.scrollLeft';
			}else if (self.pageYOffset) {
				n = 'window.pageXOffset';
			}
		}else if (str == 'scroll_top'){
			if (document.body && document.body.scrollTop){
				n = 'document.body.scrollTop';
			}else if (document.documentElement && document.documentElement.scrollTop){
				n = 'document.documentElement.scrollTop';
			}else if (self.pageYOffset) {
				n = 'window.pageYOffset';
			}
		}else if (str == 'page_height'){
			//var test1 = document.body.scrollHeight;
			var test2 = document.body.offsetHeight
			var test1 = document.documentElement.scrollHeight;
			if (test1 > test2){
				n = 'document.documentElement.scrollHeight';
			}else{
				n = 'document.body.offsetHeight';
			}
		}else if (str == 'page_width'){
			var test1 = document.body.scrollHeight;
			var test2 = document.body.offsetHeight
			if (test1 > test2){
				n = 'document.body.scrollWidth';
			}else{
				n = 'document.body.offsetWidth';
			}
		}
		return n;
	}

	this.preload_loding = function(){
		var i  = new Image
		i.src = 'FAFM/ajax_loader/circle_flower.gif'
	}

	this.show_image = function(img_url, th_img_el){
		if (!this.image_scheduled){
			return;
		}
		if (this.image){
			return
		}
		this.hide_loading()
		this.show_shutter()
	
		var title= th_img_el.getAttribute('alt');
		var caption = th_img_el.getAttribute('caption') || th_img_el.getAttribute('longdesc');
		var url = img_url
		
		var div = document.createElement('div');
		div.id = 'view_image_window'
		div.style.position = 'absolute'
		div.style.zIndex = '5'
		div.style.left = '50%'
		div.style.margin = 'auto'
		div.style.fontSize = '99%'
		div.style.overflow = 'visible'
		div.style.cursor = 'pointer'

		div.innerHTML = " \
			<table class=\"s_i_v_table\"> \
			<tbody><tr>	\
				<td class=\"s_i_v_td\" > \
					<div class=\"s_i_v_div1\" > \
						<div class=\"s_i_v_div2\" onclick=\"document.getElementById('optsContainer').style.display = 'none'\">X</div> \
						<div id=\"optsTitleContainer\" style=\"padding: 5px 5px 5px 9px;\">"+title+"</div> \
					</div> \
					<div id=\"optsContainerData\" style=\"padding: 10px;\"> \
						<img src='"+url+"'><br> \
						"+caption+" \
					</div> \
				</td> \
			</tr> \
			</tbody> \
			</table> \
		";

		document.body.appendChild(div);

		var height = div.offsetHeight;

		eval('var scrolled = ' + this.get_vieport_property_name('inner_height') + ';');
		scrolled -= height;
		scrolled >>= 1;
		eval('scrolled += ' + this.get_vieport_property_name('scroll_top') + ';');

		div.style.top = scrolled + 'px';

		var img = div.getElementsByTagName('img')[0];
		var width = img.offsetWidth;
		var node = img;
		while (node){
			if (node.id && node.id == 'view_image_window'){
				break;
			}
			if (node.offsetLeft) {
				width += (node.offsetLeft << 1); // both sides
			}
			node = node.parentNode;	
		}

		div.style.width = width + 'px';
		
		eval('var scrolled_w = ' + this.get_vieport_property_name('inner_width') + ';');
		scrolled_w -= width;
		scrolled_w >>= 1;
		eval('scrolled_w += ' + this.get_vieport_property_name('scroll_left') + ';');
		
		div.style.left = scrolled_w + 'px';
		var this_obj = this
		div.onclick = function(){
			this_obj.hide_all()
		}
		
		this.image = div;
		this.blink();
	}

	this.schedule_loading = function(url, this_img){
		if (this.image_scheduled){
			return;
		}
		this.image_scheduled = true;
		
		var ni = new Image;
		ni.src = url;
		if (ni.complete){
			this.show_image(url, this_img)
		}else{
			var this_obj = this;
			ni.onload = function (){
				this_obj.show_image(url, this_img)
			}
			this.show_loading()
		}
	}
  this.blink = function()
  {
    div = document.createElement('div');
		div.style.top = '0';
		div.style.left = '0';
		div.id = 'lightbox_empty_blinker';
		div.style.backgroundColor = 'transparent';
		div.style.position='absolute';
		div.style.zIndex = '4'
		eval('div.style.height = '+ this.get_vieport_property_name('page_height')+ '+"px";');
		eval('div.style.width = '+ this.get_vieport_property_name('page_width')+ '+"px";');
		document.body.insertBefore(div, document.body.firstChild);
		setTimeout('document.body.removeChild(document.getElementById(\'lightbox_empty_blinker\'));', 0);
  }
  
	this.show_shutter = function(){
		var shutter = this.shutter
		if (shutter){
			return
		}
		shutter = document.createElement('div');
		shutter.style.top = '0';
		shutter.style.left = '0';
		shutter.style.opacity = '0.8';
		shutter.style.backgroundColor = '#333';
		shutter.style.position='absolute';
		shutter.style.filter = 'alpha(opacity=80);';
		shutter.style.cursor = 'pointer';
		shutter.style.zIndex = '4'
		// shutter.id = 'shutter';
		eval('shutter.style.height = '+ this.get_vieport_property_name('page_height')+ '+"px";');
		eval('shutter.style.width = '+ this.get_vieport_property_name('page_width')+ '+"px";');
		document.body.insertBefore(shutter, document.body.firstChild);
		var this_obj = this
		shutter.onclick = function(){
			this_obj.hide_all()
		}
		this.shutter = shutter
	}

	this.show_loading = function(){
		if (this.image){
			return
		}
		if (this.loading){
			return
		}
		this.show_shutter()

		var div = document.createElement('div')
		div.id = 'view_image__loading'
		div.innerHTML="<center><span nowrap><i>loading</i></span></center>"
		div.style.position = "absolute"
		div.style.zIndex = '5'
		div.style.left = '50%'
		div.style.margin = 'auto'
		div.style.overflow = 'visible'
		div.style.cursor = 'pointer'
		div.style.padding = '20px'
		div.style.backgroundColor = 'white'

		document.body.appendChild(div);

		var height = div.offsetHeight;

		var scrolled = eval(this.get_vieport_property_name('inner_height'));
		scrolled -= height;
		scrolled >>= 1;
		eval('scrolled += ' + this.get_vieport_property_name('scroll_top') + ';');

		div.style.top = scrolled + 'px';

		var img = div.getElementsByTagName('img')[0];
		var width = img.offsetWidth;
		var node = img;
		while (node){
			if (node.id && node.id == 'view_image__loading'){
				break;
			}
			if (node.offsetLeft) {
				width += (node.offsetLeft << 1); // both sides
			}
			node = node.parentNode;	
		}

		div.style.width = width + 'px';
		
		eval('var scrolled_w = ' + this.get_vieport_property_name('inner_width') + ';');
		scrolled_w -= width;
		scrolled_w >>= 1;
		eval('scrolled_w += ' + this.get_vieport_property_name('scroll_left') + ';');
		
		div.style.left = scrolled_w + 'px';
		var this_obj = this
		div.onclick = function(){
			this_obj.hide_all()
		}

		this.loading = div
	}

	this.hide_all = function(){
		this.image_scheduled = false
		this.hide_shutter()
		this.hide_loading()
		this.hide_image()
	}

	this.hide_shutter = function(){
		if (this.shutter) {
			this.shutter.parentNode.removeChild(this.shutter)
			this.shutter = null
		}
	}

	this.hide_loading = function(){
		if (this.loading){
			this.loading.parentNode.removeChild(this.loading)
			this.loading = null
		}
	}

	this.hide_image = function(){
		if (this.image){
			this.image.parentNode.removeChild(this.image)
			this.image = null
		}
	}

	this.preload_loding()
}
window.image_viewer = new ImageViewer()
function simpleImageViewer(urlImgToView, thisImgClick){
	window.image_viewer.schedule_loading(urlImgToView, thisImgClick)
}
/*uso:
<img src='thumbnail.extensao' onclick='simpleImageViewer("url_imagemGrande.extensao", this);' alt="Esse campo vira o texto do box/window" caption="Esse campo vira uma legenda abaixo da img, no final do box/window." />
*/