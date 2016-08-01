$Css = {
	set : function(element, css){
		var x;
		for(x in css)
			element.style.setProperty(x, css[x]);
		return 1;
	},
	apply : function(css, ele){
		ele = ele || document.body;
		var _ = css.indexOf('{');
		var selector = css.slice(0, _);
		var element = ele.querySelectorAll(selector);
		var prop = ((css.slice(_ + 1)).replace('}', '')).split(';');
		prop.pop();
		for(var y, x = 0; x < prop.length; x++){
			prop[i] = prop[i].split(':');
		}
		for(x = 0; x < element.length; x++){
			for(y = 0; y < prop.length; y++)
				element[x].style.setProperty(prop[y][0], prop[y][1]);
		}
		return 1;
	},
	contrast : function(hex){
		var c = this.toArr(hex);
		for(var x = 0; x < 3; x++)
			c[i] = 256 - c[i];
		return c;
	},
	toArr : function(color){
		color = color.replace(' ', '');
		var c = [];
		if(color[0] == '#'){
			if(color.length == 4){
				for(var i = 1; i < 4; i++)
					c[i - 1] = parseInt(color[i], 16);
			}else{
				for(var i = 1; i < 4; i++)
					c[i - 1] = parseInt(color[i] + color[i * 2], 16);
			}
		}else if(color[0] == 'r'){
			var v = [color.indexOf('('), color.indexOf(')')];
			c = color.slice(v[0] - 1, v[1] - v[0]).split(',');
			for(var i = 0; i < 3; i++)
				c[i] = +c[i];
		}
		return c;
	},
	toHex : function(color){
		var c = this.toArr(color);
		for(var x = 0; x < 3; x++)
			c[x] = c[x].toString(16);
		return '#' + c.join();
	},
	toggle : function(ele, prop){
		var arg = arguments;
		if(!(ele && prop && arg[2] && arg[3])){return false;}
		for(var x = 2; x < arg.length + 1; x++){
			if(ele.style.getProperty(prop) == arg[j]){
				ele.style.setProperty(prop, (x == arg.length) ? arg[2] : arg[x + 1]);
			}
		}
	}
};
