$Usefull = {
	test : function(obj, type){
		return obj.constructor.toString().toLowerCase().indexOf(type.toLowerCase()) > -1;
	},
	exists : function(arg, def){
		return arg === undefined ? arg : def;
	},
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
	}
};
