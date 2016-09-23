$Constructor = {
	start : function(){
		for(let i of this.functions) ($Usefull.test(i, 'string') ? this[i]() : i());
	},
	functions : ['video'],
	video : function(){
		var ele = document.querySelectorAll('[yt-vid]');
		if(!ele) return 0;
		var b, id, data;
		for(let i in ele){
			id = ele[i].getAttribute('yt-id');
			data = ele[i].getAttribute('yt-data') || '&';
			b = $Usefull.create('iframe', ele[i]);
			b.src = 'https://www.youtube.com/watch?v=' + id + data;
			b = null;
		}
	},
	create : function(type, element, callback){
		var ele = element || document.body;
		var a = ele.createElement(type);
		ele.appendChild(a);
		if(callback){
			callback(a);
		}
		return a;
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
	},
	init : function() {
		//By : Mik, http://stackoverflow.com/questions/2980763/javascript-objects-get-parent#answer-10170826
		for(var x in arguments) this[arguments[x]].parent = this;
		return this;
	}
};
document.addEventListener('load', $Constructor.start);
