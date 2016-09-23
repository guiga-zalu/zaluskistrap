$Canvas = {
	create : function(element, mode){
		if(element && parent){
			this.element = element;
			return this.element;
		}
		element = element || document.body;
		this.element = document.createElement('canvas');
		element.appendChild(this.element);
		return this.element;
	},
	contextSet : function(type){
		type = type || '2d';
		this.context = this.element.getContext(type);
		return this.context;
	},
	imgData : {
		imgDatas : [],
		save : function(x, y, cx, cy){
			this.imgDatas.push(this.parent.context.createImageData(x, y, cx, cy));
		},
		use : function(index, x, y, cx, cy){
			this.parent.context.drawImage(this.imgDatas[index], x, y, cx, cy);
		},
		toDataURI : function(index){
			return this.imgDatas[index].toDataURL();
		}
	},
	init : function() {
		//By : Mik, http://stackoverflow.com/questions/2980763/javascript-objects-get-parent#answer-10170826
		for(var x in arguments) this[arguments[x]].parent = this;
		return this;
	}
}.init('imgData');
$Canvas.new = function(){
	return Object.create($Canvas);
}
