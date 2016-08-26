_Conversor = $Usefull.Conversor = {
	every : function(valor, u0, u1){
		var ret;
		u1 = u1.toLowerCase();
		switch(u1){
			case 'hz':
			case 'khz':
				ret = this.toHz(valor, u0); break;
			case 's':
			case 'ms':
				ret = this.toS(valor, u0); break;
			default: return 0;
		}
		if(u1 == 'ms') ret *= 1000;
		if(u1 == 'khz') ret /= 1000;
		return ret;
	},
	toHz : function(valor, u, mega){
		var ret;
		u = u.toLowerCase();
		if(u == 'ms') valor /= 1000;
		if(u == 'khz') valor *= 1000;
		switch(u){
			case 'hz':
			case 'khz':
				ret = valor; break;
			case 's':
			case 'ms':
				ret = 1 / valor; break;
			default: return 0;
		}
		return mega ? ret / 1000 : ret;
	},
	toS : function(valor, u, mega){
		var ret;
		u = u.toLowerCase();
		if(u == 'ms') valor /= 1000;
		if(u == 'khz') valor *= 1000;
		switch(u){
			case 'hz':
			case 'khz':
				ret = 1 / valor; break;
			case 's':
			case 'ms':
				ret = valor; break;
			default: return 0;
		}
		return mega ? ret * 1000 : ret;
	}
};
