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
		for(let x in prop){
			prop[i] = prop[i].split(':');
		}
		for(var x in element){
			for(let y in prop)
				element[x].style.setProperty(prop[y][0], prop[y][1]);
		}
		return 1;
	},
	contrast : function(hex){
		var c = this.toArr(hex);
		for(let x = 0; x < 3; x++)
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
		for(let x in c)
			c[x] = c[x].toString(16);
		return '#' + c.join();
	},
	toRGB : function(color, alpha){
		var _color = [color[0], color[1], color[2]];
		var ret = 'rgb' + (alpha ? 'a' : '') + '(' + _color.join(',');
		ret += (alpha ? ',' + 1/color[3] : '') + ')';
		return ret;
	},
	toggle : function(ele, prop){
		var arg = arguments;
		if(!(ele && prop && arg[2] && arg[3])){return false;}
		for(var x = 2; x < arg.length + 1; x++){
			if(ele.style.getProperty(prop) == arg[j]){
				ele.style.setProperty(prop, (x == arg.length) ? arg[2] : arg[x + 1]);
			}
		}
	},
	randomColor : function(){
		var ret = [];
		ret.length = 4;
		for(let x = 0; x < 4; x++;)
			ret[x] = Math.floor(Math.random() * 256);
		return ret;
	},
	random : function(){
		return this.toRGB(this.randomColor(), true);
	}
};
