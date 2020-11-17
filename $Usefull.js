class $Usefull{
	static request(url, method, async, mode, callback){
		method = method || 'GET';
		async = (async == undefined) ? true : async;
		var sec = new XMLHttpRequest();
		sec.onreadystatechange = function(){
			if(sec.readyState == 4 && sec.status == 200){
				var response = mode ? sec.responseText : sec.responseXML;
				callback(response);
			}
		}
		sec.open(method, url, async);
		sec.send();
	}
	static spliter(url, spacer, ele, callback){
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
	static test(obj, type){
		if(typeof type !== 'string'){
			if(obj istanceof type
			|| obj === type) return true;
			type = typeof type;
		}
		return (
			obj === type
			|| obj.constructor.toString().toLowerCase().includes(type.toLowerCase())
		);
	}
	static exists(arg, _default){
		return arg === undefined ? _default : arg;
	}
}
$Usefull.defaultValue = $Usefull.exists;
if($Math){
//	if('randomChoice' in $Math){
		$Usefull.uuID = function uuID(length = 8, lowerCase = false){
			var i;
			if(!('chars' in $Usefull.uuID)){
				var arr = [];
				//adding only lower case letters
				//for(i = ; i < ; i++) arr.push(String.fromCharCode(i));
				for(i = 65; i < 91; i++) arr.push(String.fromCharCode(i));
				//Only ASCII 4 now
				//for(i = ; i < ; i++) arr.push(String.fromCharCode(i));
				arr.push('$');
				arr.push('_')
				$Usefull.uuID.chars = arr;
			}
			if(!('usedIDs' in $Usefull.uuID)) $Usefull.uuID.usedIDs = {};
			var ret, joined;
			do{
				ret = [];
				for(i = 0; i < length; i++){
					ret[i] = $Math.randomChoice.apply(null, $Usefull.uuID.chars);
					ret[i] = ret[i]['to' + $Math.randomChoice('Lower', 'Upper') + 'Case']();
				}
				joined = ret.join('');
				if(lowerCase) joined = joined.toLowerCase();
			}while(joined in $Usefull.uuID.ids);
			$Usefull.uuID.usedIDs[ joined ] = true;
			return joined;
		}
//	}
}

ImageData.prototype.coords = function coords(x, y){
	return (this.width * y + x) << 2;
};
ImageData.prototype.remove = function remove(r, g, b){
	for(var j = this.data.length, i = 0; i < j; i += 4){
		if(this.data[i] == r && this.data[i + 1] == g && this.data[i + 2] == b) this.data[i + 4] = 0;
	}
}
