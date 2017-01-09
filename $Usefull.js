var $Usefull = {
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
$Usefull.test = (obj, type) => obj.constructor.toString().toLowerCase().indexOf(type.toLowerCase()) > -1;
$Usefull.exists = (arg, def) => arg === undefined ? arg : def;
ImageData.prototype.constructor.coords = (x, y) => (this.width * y + x) << 2;
ImageData.prototype.constructor.remove = function remove(r, g, b){
	for(var j = this.data.length, i = 0; i < j; i += 4){
		if(this.data[i] == r && this.data[i + 1] == g && this.data[i + 2] == b) this.data[i + 4] = 0;
	}
}
