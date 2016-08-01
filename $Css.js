$Css = {
	set : function(element, css){
		var x;
		for(x in css){
			element.style.setProperty(x, css[x]);
		}
		return 1;
	},
	apply : function(css, ele){
		ele = ele || document.body;
		var _ = css.indexOf('{');
		var selector = css.slice(0, _);
		var element = ele.querySelectorAll(selector);
		var prop = css.slice(_ + 1)
						.replace('}', '')
						.split(';');
		prop.pop();
		for(var x = prop.length, y; x > 0; x--){
			prop[i] = prop[i].split(':');
		}
		for(x = element.length; x > 0; x--){
			for(y = prop.length; y > 0; y--){
				element[x].style.setProperty(prop[y][0], prop[y][1]);
			}
		}
		return 1;
	},
	contrast : function(hex){
		var c = this.toHexArr(hex);
		for(var x = 0; x < 3; x++){
			c[i] = -parseInt(c[i], 16);
			c[i] += 256;
		}
		return '#' + c[0] + c[1] + c[2];
	}
};
