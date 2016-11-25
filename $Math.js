$Math = {
  per : function(a){
    a = +a;
    a = Math.floor(a);
    if(a < 2){
      return 1;
    }else{
      return a * this.per(a-1);
    }
  },
  sum : function(inicial, final, valor, razao){
    var ret = (typeof valor).toLowerCase() == 'string' ? '' : 0;
    inicial = $Usefull.exist(inicial, 0);
    razao = razao || 1;
    if($Usefull.test(inicial, 'array')){
      var adicional = final == undefined ? 0 : final;
      for(var x in inicial) ret += inicial[x] + adicional;
    }else{
      for(; inicial <= final; inicial += razao) ret += valor;
    }
    return ret;
  },
  prod : function(inicial, final, valor, razao){
    var ret = 1;
    inicial = $Usefull.exist(inicial, 0);
    razao = razao || 1;
    if($Usefull.test(inicial, 'array')){
      var adicional = final == undefined ? 0 : final;
      for(var x in inicial) ret *= inicial[x] + adicional;
    }else{
      for(; inicial <= final; inicial += razao) ret *= valor;
    }
    return ret;
  },
  coProd : function(valores, inicial, final){
    var ret = 1;
    inicial = $Usefull.exist(inicial, 0);
    final = $Usefull.exist(final, valores.length - 1);
    for(let x = inicial; x <= final; x++) ret *= 1 - valores[x];
    return ret;
  },
  fromTo : function(){
    b = b || 10;
    c = c || 36;
    a = (typeof a).toLowerCase() == 'string' ? a : a.toString();
    var ret = parseFloat(a, b);
    return ret.toString(c);
  },
  random : function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
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
    for(let i in ret)
      ret[i] = this.randomChar(1, gama);
    return ret.join();
  },
  isCousin : function(int){
    for(var i = 2; i < int / 2; i++) if(!(int % i)) return false;
    return true;
  },
  cousin : function(max){
    max = max == undefined ? 100 : Math.floor(max);
    var ret = [];
    for(var i = 2; i < max; i++) if(this.isCousin(i)) ret.push(i);
    return ret;
  },
  divisors : function(int){
    var ret = [];
    var primos = this.cousin(Math.floor(int));
    for(var i = 0, j, k; i < primos.length; i++){
      console.log('i:'+i);
      auxiliar = false;
      j = primos[i];
      console.log('j:'+j);
      if(!(int % j)){
        k = 0;
        while(!(int % j)){
          console.log('int:'+int);
          k++;
          int /= j;
          console.log('k:'+k);
        }
        ret.push([ j, k ])
      }
    }
    return ret.length ? ret : false;
  }
};
$Math.div = (a, b = 1) => Math.floor(a / b);
$Math.randomChar = (min, max) => String.fromCharCode( this.random(min, max) );
$Math.floor = (a, b = 100) => Math.floor(a * b) / b;
