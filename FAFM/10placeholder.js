var placeholder = {
	colorOn : 'black',
	colorOff : 'gray',
	testAttribute : function(element, attribute) {
		var test = document.createElement(element);
		if (attribute in test) {
			return true;
		}else{
			return false;
		}
	},
	init : function(el_id, txt) {
		if (!this.testAttribute("input", "placeholder")){
			window.onload = function() {
				var demo = document.getElementById(el_id);
				demo.style.color = this.colorOff;
				demo.value = txt;
				demo.onfocus = function() {
					if (this.style.color == this.colorOff) { 
						this.value = ""; 
						this.style.color = this.colorOn;
					}
				}
				demo.onblur = function() {
					if (this.value == "") { 
						this.style.color = this.colorOff;
						this.value = txt;
					}
				}
			}
		}
	}
}	