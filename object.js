$Itnerator = {
	lessLast : (iti, val) => iti.slice(0, iti.lastIndexOf(val)),
	values : function(iti){
		var ret = [iti[0]];
		for(var i = 0, j, breaked; i < iti.length; i++){
			for(j = 0, breaked = false; j < ret.length; j++){
				if(iti[i] === ret[j]){
					breaked = true;
					break;
				}
			}
			if(!breaked) ret.push(iti[i]);
		}
		return ret;
	},
	getPos : function(iti, val, prop){
		var i = 0, l = iti.length;
		if(typeof prop === 'undefined'){
			for(; i < l; i++){
				if(iti[i] == val) return i;
			}
		}else{
			for(; i < l; i++){
				if(iti[i][prop] == val) return i;
			}
		}
		return -1;
	},
	countValues : function(iti){/* Lerdo */
		var ret = [];
		for(var i = 0, j; i < iti.length; i++){
			j = $Itnerator.getPos(ret, iti[i]);
			if(j > -1){
				ret[j].count++;
			}else{
				ret.push({value: iti[i], count: 1});
				ret.sort((a, b) => a.value - b.value);
			}
		}
		ret.sortByCount = () => ret.sort((a, b) => a.count - b.count);
		return ret;
	},
	indexes : function(a, b){
		var c = [];
		for(var i = 0; i < b.length; i++)
			c.push(a[ b[ i ] ]);
		return c;
	}
};
$Itnerator.search = $Itnerator.indexOf = $Itnerator.getPos;
$Array = {
	join : function(array, array2){
		for(var ret = [], lenArray = array2.length, i = 0; i < array.length; i++){
			ret.push(array[i]);
			ret.push(array2[i % lenArray]);
		}
		ret[ ret.length - 1 ] = '';
		return ret.join('');
	},
	/*similarityCountValues = function(arr, order){/* Lerdo *-/
		order = +order || 0;
		var ret = [{value: arr[i], count: 1}];
		var subArrayLen = arr[0].length;
		for(var i = 0, j, k, l, isEqual; i < arr.length; i++){
		//i: itinera 'arr'
		//isEqual: testa se 'arr[i]' é igual a 'ret[k]'
			for(j = 0; j < subArrayLen; j++){
			//j: itinera 'arr[i]'
				for(k = 0; k < ret.length; k++){
				//k: itnera 'ret'
					for(l = 0, isEqual = true; l < subArrayLen; l++){
					//l: itnera 'ret[k]'
					//m: 'ret[k].value'
						m = ret[k].value;
						if(arr[i][j] != m[l]){//O Teste Derradeiro!
							isEqual = false;
							break;
						}
					}
					if(isEqual) break;
				}
				if(isEqual) break;
			}
			if(isEqual)
			if(j > -1){
				ret[j].count++;
			}else{
				ret.push({value: arr[i], count: 1});
				ret.sort((a, b) => a.value - b.value);
			}
		}
		ret.sortByCount = () => ret.sort((a, b) => a.count - b.count);
		return ret;
	},*/
	similarity : (arr, order = 2) => {
		for(var ret = [], i = 0, l = arr.length; i < l; i++)
			ret[i] = isNaN(arr[i]) ? 0 : Math.floor( (arr[i] + 1) / order ) * order - 1;
		return ret;
	}
};
$Array.randomize = (arr) => arr.sort(() => 0.5 - Math.random());
$String = {
	searchAll : function(string, str, c){
		c = (c == undefined) ? 0 : c;
		var ret = [];
		while(string.search(str, c) > -1){
			ret.push(string.search(str, c));
			c += str.length;
		}
		return ret.length ? ret : -1;
	},
	split : function(str, b){
		if(isNaN(b)){//Em desenvolvimento
			return false;
		}else{
			for(var ret = [], i = 0, len = Math.floor(str.length / b); i < len; i++){
				ret[i] = str.slice(i * b, b);
			}
			return ret;
		}
	},
	format : function(str, mode){
		mode = mode.trim().toLowerCase().replace('case', '');
		var ret;
		switch(mode){
			case 'upper':
				ret = str.toUpperCase(); break;
			case 'lower':
				ret = str.toLowerCase(); break;
			case 'random':
				ret = $String.toRandomCase(str); break;
			case 'capitalize':
			case 'capital':
				ret = $String.toCapitalCase(str); break;
			default: break;
		}
		return ret;
	},
	toRandomCase : function(str){
		var ret = [];
		for(var i = str.length; i > -1; i--) ret.push(str[i]['to' + $Math.randomChoice('Low', 'Upp') + 'erCase']());
		return ret.reverse().join('');
	},
	toCapitalCase : function(str, mode){
		if(mode){
			var arr = str.split(' ');
			for(var i = str.length, ret = []; i > -1; i--){
				ret.push( $String.toCapitalCase(arr[i]) );
			}
			return ret.reverse().join(' ');
		}else{
			str = str[0].toUpperCase() + str.slice(1, -1).toLowerCase();
		}
	},
	capitalize : $String.toCapitalCase.apply(this, arguments),
	//to?Case : function(){},
	multiply : function(a, b){/* Lixo em Alfa.Beta*/
		var len = Math.max(a.length, b.length),
			ret = [];
		if($String.multiply.MAX){
			for(var i = 0; i < len; i++){
				ret[i] = String.fromCharCode(
					((a.charCodeAt(i) || 1) * (b.charCodeAt(i) || 1)) % $String.multiply.MAX
				);
			}
		}else{
			for(var i = 0; i < len; i++){
				ret[i] = String.fromCharCode(
					(a.charCodeAt(i) || 1) * (b.charCodeAt(i) || 1)
				);
			}
		}
		return ret.join('');
	}
};
$String.multiply.MAX = 0;
//256 for ASCII

for(let i in $Itnerator)
	$Array[i] = $String[i] = $Itnerator[i];
