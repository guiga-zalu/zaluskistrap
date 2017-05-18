window['$Math'] = $Math = {
	per : (a = 0) => a > 2 ? a * $Math.per(a-1) : 1,
	sum : (inicial = 1, final = 5, func) => {
		for(var ret = 0, i = inicial; i <= final; i++){
			if(func.isArray()) ret += func[i];
			else if(func.isGenerator()) ret += func.next(i);
			else ret += func(i);
		}
		return ret;
		/*var ret = (typeof valor).toLowerCase() == 'string' ? '' : 0;
		inicial = $Usefull.exist(inicial, 0);
		razao = razao || 1;
		if($Usefull.test(inicial, 'array')){
			var adicional = final == undefined ? 0 : final;
			for(var x in inicial) ret += inicial[x] + adicional;
		}else{
			for(; inicial <= final; inicial += razao) ret += valor;
		}
		return ret;*/
	},
	prod : (inicial = 1, final = 5, func) => {
		for(var ret = 1, i = inicial; i <= final; i++){
			if(func.isArray()) ret *= func[i];
			else if(func.isGenerator()) ret *= func.next(i);
			else ret *= func(i);
		}
		return ret;
		/*var ret = 1;
		inicial = inicial != undefined ? inicial : 0;
		razao = razao || 1;
		if($Usefull.test(inicial, 'array')){
			var adicional = final == undefined ? 0 : final;
			for(var x in inicial) ret *= inicial[x] + adicional;
		}else{
			for(; inicial <= final; inicial += razao) ret *= valor;
		}
		return ret;*/
	},
	coProd : function(valores, inicial, final){
		for(var ret = 1, i = inicial; i <= final; i++){
			if(func.isArray()) ret *= 1 - func[i];
			else if(func.isGenerator()) ret *= 1 - func.next(i);
			else ret *= 1 - func(i);
		}
		return ret;
		/*var ret = 1;
		inicial = $Usefull.exist(inicial, 0);
		final = $Usefull.exist(final, valores.length - 1);
		for(let x = inicial; x <= final; x++) ret *= 1 - valores[x];
		return ret;*/
	},
	fromTo : (numero = '0', base0 = 10, base1 = 36) => {
		return parseFloat(a, base0).toString(base1);
	},
	random : (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
	rand : (min, max) => min + Math.random() * (max - min + 1),
	randomString : function(min, max, char){
		var charCode = char;
		var m = [];
		if(min == +min){
			m.push(min);
			if(max == +max){
				m.push(max);
			}else{
				m.push(1);
				m = m.reverse();
				charCode = min;
			}
		}else{
			charCode = min;
			m = [1, 100];
		}
		var tamanho = this.random(m[0], m[1]);;
		var ret = [];
		var gama;
		ret.length = tamanho;
		switch(charCode.toLowerCase()){
			case 'utf-8':
				gama = 65536;
			case 'ansi':
			case 'ascii':
				gama = 256; break;
			default:
				gama = 128; break;
		}
		for(var i in ret) ret[i] = $Math.randomChar(1, gama);
		return ret.join();
	},
	isCousin : function(int){
		for(var i = 2; i < int / 2; i++){
			if(!(int % i)) return false;
		}
		return true;
	},
	cousin : (max = 100) => {
		for(var ret = [], i = 2; i < max; i++){
			if($Math.isCousin(i)) ret.push(i);
		}
		return ret;
	},
	divisors : function(int){
		var ret = [];
		var primos = $Math.cousin(Math.floor(int));
		for(var i = 0, j, k; i < primos.length; i++){
			auxiliar = false;
			j = primos[i];
			if(!(int % j)){
				k = 0;
				while(!(int % j)){
					k++;
					int /= j;
				}
				ret.push([ j, k ])
			}
		}
		return ret;
	},
	spread : (original, ammount) => $Math.random(original - ammount, ammount * 2),
	randomChoice : function(){
		return arguments[ $Math.random(0, arguments.length - 1) ];
	}
};
$Math.div = (a, b = 1) => Math.floor(a / b);
$Math.randomChar = (min = 1, max = 255) => String.fromCharCode( this.random(min, max) );
$Math.floor = (double, tax = 2) => +double.toPrecision(tax);
