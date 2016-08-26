$Usefull = {
	exists : (arg, def) => (arg === undefined ? arg : def),
	request : function(url, method, async, mode, callback){
		method = method || 'GET';
		async = (async == undefined) ? true : async;
		var sec = new XMLHttpRequest();
		sec.onreadystatechange = function(){
			if(sec.readyState == 4 && sec.status == 200){
				var response = (mode) ? sec.responseText : sec.responseXML;
				callback(response);
			}
		}
		sec.open(method, url, async);
		sec.send();
	},
	spliter : function(url, spacer, ele, callback){
		function split(txt){
			ele.innerText = txt;
			var a = true;
			do{
				text = text.replace(spacer, '</div><div>');
				a = text.indexOf(spacer) > -1;
			}while(a);
			text = '<div>' + text + '</div>';
			ele.innerHTML = text;
		}
		this.request(url, 'GET', true, 1, split);
	},
	create : function(type, element, callback){
		var ele = element || document.body;
		var a = ele.createElement(type);
		ele.appendChild(a);
		if(!callback){
			return a;
		}
		callback(a);
	},
	overlay : function(style, element){
		style = style || {
			'background-color' : 'rgba(32, 32, 32, 0.25)',
			'z-index' : 9999,
			'position' : 'fixed',
			'top' : 0,
			'left' : 0,
			'width' : '100%',
			'height' : '100%'
		};
		if(!element) element = this.create('div');
		$Css.set(element, style);
		return element;
	},
	alert : function(msg, size, css, callback){
		var mask = this.overlay();
		var d = mask.createElement('div');
		mask.appendChild(d);
		$Css.set(d, {
			top:0,
			left:0,
			position:'absolute',
			margin:'auto',
			width:size[0] || '80%',
			height:size[1] || '80%'
		});
		if(css) $Css.set(d, css);
		d.innerHTML = msg;
		var btn = d.createElement('button');
		d.appendChild(btn);
		btn.innetHTML = 'Ok';
		btn.addEventListener('click', function(){
			callback();
			mask.removeChild(d);
			document.body.removeChild(mask);
		});
	}
};
