$Constructor = {
	init : function(){
		for(let i of this.functions)
			(i[0] ? this[i]() : i());
	},
	functions : ['video'],
	video : function(){
		var ele = document.querySelectorAll('[yt-vid]');
		if(!ele) return 0;
		var b, id, data;
		for(let i in ele){
			id = ele[i].getAttribute('yt-id');
			data = ele[i].getAttribute('yt-data') || '&';
			b = $Usefull.create('iframe', ele[i]);
			b.src = 'https://www.youtube.com/watch?v=' + id + data;
			b = null;
		}
	}
};
document.addEventListener('load', $Constructor.init);
