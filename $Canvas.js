$Canvas = {
	that : this,
	create : function(element, mode){
		if(element && parent){
			that.element = element;
			return that.element;
		}
		element = element || document.body;
		that.element = document.createElement('canvas');
		element.appendChild(that.element);
		return that.element;
	},
	contextSet : function(type){
		type = type || '2d';
		that.context = that.element.getContext(type);
		return that.context;
	},
	imgData : {
		imgDatas : [],
		save : function(x, y, cx, cy){
			this.imgDatas.push(that.context.createImageData(x, y, cx, cy));
		},
		use : function(index, x, y, cx, cy){
			that.context.drawImage(this.imgDatas[index], x, y, cx, cy);
		},
		toDataURI : function(index){
			return this.imgDatas[index].toDataURL();
		}
	}
}
