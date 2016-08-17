class $Canvas {
	that : this,
	create(element, mode){
		if(element && parent){
			this.element = element;
			return this.element;
		}
		element = element || document.body;
		this.element = document.createElement('canvas');
		element.appendChild(this.element);
		return this.element;
	},
	contextSet(type){
		type = type || '2d';
		this.context = this.element.getContext(type);
		return this.context;
	},
	get imgData(){
		var imgDatas = [];
		var save = function(x, y, cx, cy){
			this.imgDatas.push(that.context.createImageData(x, y, cx, cy));
		}
		var use = function(index, x, y, cx, cy){
			that.context.drawImage(this.imgDatas[index], x, y, cx, cy);
		}
		var toDataURI = (index) => this.imgDatas[index].toDataURL();
		return {imgDatas: imgDatas, save: save, use: use, toDataURI: toDataURI};
	}
}
