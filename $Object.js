$Array = {
	each : function(arr, call){
		var ret = [];
		for(let i in arr)
			ret.push(call(arr[i]));
		return ret;
	},
};
$String = {
	lessLast : function(string, str){
		return string.slice(0, string.lastIndexOf(str));
	},
	searchAll : function(string, str, index){
		index = index > 0 ? index : 0;
		var ret = [], l = str.length;
		while(string.search(str, index) > -1){
			ret.push(string.search(str, index));
			index += l;
		}
		return ret.length ? ret : 0;
	},
	indexes : function(string, arr){
		var ret = [];
		for(let i in arr)
			ret.push(string[ arr[i] ]);
		return ret.length ? ret : 0;
	}
};
