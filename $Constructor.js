$Constructor = {
	init : function(callback){
		for(var i = 0, j = this.functions.length; i < j; i++)
			this[this.functions[i]]();
		if(callback) return callback();
	},
	video : function(){
		var ele = document.querySelectorAll('[yt-vid]');
		if(!ele) return 0;
		for(var i = 0, b, id, data; i < ele.length; i++){
			id = ele[i].getAttribute('yt-id');
			data = ele[i].getAttribute('yt-data') || '&';
			b = $Usefull.create('iframe', ele[i]);
			b.src = 'https://www.youtube.com/watch?v=' + id + data;
		}
	}
};
document.addEventListener('load', $Constructor.init);
