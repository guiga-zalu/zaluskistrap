$Math = {
  per : function(a){
    a = +a;
    a = this.div(a);
    if(a < 2){
      return 1;
    }else{
      return a * this.per(a-1);
    }
  },
  div : function(a, b){
    b = b || 1;
    return (a-a%b)/b;
  }
  sum : function(inicial, final, valor, razao){
    var ret = (typeof razao).toLowerCase() == 'string' ? '' : 0;
    inicial = $Usefull.exist(inicial, 0);
    razao = razao || 1;
    for(; inicial <= final; inicial += razao)
      ret += valor;
    return ret;
  },
  prod : function(inicial, final, valor, razao){
    var ret = 1;
    inicial = $Usefull.exist(inicial, 0);
    razao = razao || 1;
    for(; inicial <= final; inicial += razao)
      ret *= valor;
    return ret;
  },
  coProd : function(inicial, final, valores){
    var ret = 1;
    inicial = $Usefull.exist(inicial, 0);
    final = $Usefull.exist(final, valores.length - 1);
    for(let x = inicial; x <= final; x++)
      ret *= 1 - valores[x];
    return ret;
  },
  fromTo : function(){
    b = b || 10;
    c = c || 36;
    a = (typeof a).toLowerCase() == 'string' ? a : a.toString();
    let ret = parseFloat(a, b);
    return ret.toString(c);
  },
  random : function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  randomChar : (min, max) => String.fromCharCode( this.random(min, max) ),
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
  }
};
