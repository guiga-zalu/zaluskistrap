function Canvas(ele, context, width, height){
	var isCanvas = ele && ele.tagName.toLowerCase() == 'canvas';
	if(!ele || !isCanvas){
		var _ele = ele || document.body;
		ele = document.createElement('canvas');
		_ele.appendChild(ele);
	}
	context = context || '2d';
	this.context = ele.getContext(context);
	if(width){
		this.width = ele.width = width;
		if(height) this.height = ele.height = height;
		else this.height = ele.height = width;
	}
	this.multiApply = function(method){
		var haveMethod = (method in this);
		if(!haveMethod) method = 'context';
		var i = haveMethod ? 1 : 0,
		arg = arguments;
		for(var func; i < arg.length; i++){
			//this.'object'.'function'()
			if((typeof arg[i]).toLowerCase()){
				//this.'context'.'beginPath'()
				this[ method ][ arg[i] ]();
			}else{
				//this.'context'.'moveTo'(x, y)
				func = arg[i].shift();
				this[ method ][ func ].apply(this[ method ], arg[i]);
			}
		}
	};
/*
Use:
x.multiApply('context', ['beginPath'], ['moveTo', 0, 0], ['lineTo', 100, 0], ['lineTo', 100, 100], ['closePath']);
x.multiApply('context', 'beginPath', ['moveTo', 0, 0], ['lineTo', 100, 0], ['lineTo', 100, 100], 'closePath');
x.multiApply(['beginPath'], ['moveTo', 0, 0], ['lineTo', 100, 0], ['lineTo', 100, 100], ['closePath']);
x.multiApply('beginPath', ['moveTo', 0, 0], ['lineTo', 100, 0], ['lineTo', 100, 100], 'closePath');
*/
	this.imgData = {
		saves : [],
		save : (x, y, cx, cy) => this.saves.push(
			this.parent.context.createImageData(x, y, cx, cy)
		),
		use : (index, x, y, cx, cy) => this.parent.context.drawImage(
			this.saves[index], x, y, cx, cy
		),
		toDataURI : (index) => this.saves[index].toDataURL()
	};
	this.init = function(){
//By: Mik,
//http://stackoverflow.com/questions/2980763/javascript-objects-get-parent#answer-10170826
		for(var x in arguments) this[arguments[x]].parent = this;
	};
	this.init('imgData');
}
