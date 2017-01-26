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
	},
	split : function(string, arg){
		var ret = [];
		if(typeof arg === 'number'){
			var l = string.length;
			arg = arg < l ? arg : arg % l;
			var j = Math.floor(l/arg);
			for(var i = 0; i < l; i += j) ret.push(string.slice(i, j));
		}else{
			var args = arguments.shift();
			/*
			i : itinerador argumento
			j : itinerador [k]
			k : [ret] passado
			l : itinerador [m]
			m : [k] dividido
			*/
			for(var i = 0, j, k, l, m; i < args.length; i++){
				if(ret.length){
					k = ret;
					ret = [];
					for(j = 0; j < k.length; j++){
						for(m = k[j].split(args[i]), l = 0; l < m; l++) ret.push(m[l]);
					}
				}else{
					ret = string.split( arg );
				}
			}
		}
		return ret;
	}
};
