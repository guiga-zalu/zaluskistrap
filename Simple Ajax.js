class SAjax{
	constructor(url, method, data){
		this.location = url;
		this.method = method;
		this.data = data;
		this.async = true;
		this.request = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
		this.listeners = {
			'send':[],
//			'error':[],
//			'sucess':[]
			'end':[]
		};
		let that = this;
		this.timeout = {
			/*
			-persistence
			1:	Cancel on error
			2:	Ignore errors
			3:	Log errors
			*/
			init(){
				if(that.persistence < 2 && that.lastState != 200) return;
				else if(that.persistence == 3) that.addListener('error', e => console.error(e));
				that.send();
			}
		};
		this.request.onreadystatechange = () => {
			if(this.request.readyState == 4) this.end();
		};
	}
	set(prop, val){ this[ prop ] = val; }
	call(prop, code, response){
		var list = this.listeners[ prop ];
		for(var i in list) list[ i ].call(null, code, response);
	}
	open(){
		this.parseData();
		var data = this.method == 'GET' ? '?' + this.parsedData : '';
		this.request.open(
			this.location,
			this.method + data,
			this.async,
			this.user,
			this.pass
		);
	}
	send(){
		this.parseData();
		this.method == 'GET' ? this.request.send() : this.request.send( this.parsedData );
		this.call('send');
	}
	cancel(){ return this.request.abort(); }
	getHeaders(){ return this.request.getAllResponseHeaders(); }
	getHeader(name){ return this.getResponseHeader(name); }
	getSpecificHeaders(){
		var ret = [], arg = arguments;
		for(var x in arg) ret.push( this.getResponseHeader( arg[x] ) );
		return ret;
	}
	setHeader(name, value){ return this.request.setRequestHeader(name, value); }
	addListener(event, func){
		switch(event){
			case 'readystatechange':
			case 'loadstart':
			case 'progress':
			case 'abort':
			case 'error':
			case 'load':
			case 'timeout':
			case 'loadend':
				this.request.addEventListener(...arguments);
				break;
			default: this.listeners[ event ].push(func); return 0;
		}
	}
	removeListener(event, func){
		switch(event){
			case 'readystatechange':
			case 'loadstart':
			case 'progress':
			case 'abort':
			case 'error':
			case 'load':
			case 'timeout':
			case 'loadend':
				this.request.removeEventListener(...arguments);
				break;
			default:
				var index = this.listeners[ event ].findIndex(func);
				this.listeners[ event ][ index ] = null; return 0;
		}
	}
	end(){
		var response = this.mode == 0 ? this.request.responseText : (this.mode == 1 ? this.request.responseXML : this.request);
		this.call('end', this.request.readyState, response);
		this.lastState = this.request.readyState;
	};
	parseData(){
		var data = this.data;
		var ret = '';
		if(data.constructor.toString().toLowerCase().indexOf('string') > -1 && isNaN(data)){
			for(var x in data)
				ret += encodeURI(x) + '=' + encodeURI(data[x]) + '&';
		}
		this.parsedData = ret || data;
	}
	setTimeout(time, persistence, call_after = null, call_before = null){
		this.timeout.persistence = persistence || 1;
		this.timeout.call_after = call_after;
		this.timeout.call_before = call_before;
		this.timeout[SAjax.TIMEOUT] = setTimeout(time, this.timeout.init);
	}
	clearTimeout(){
		clearTimeout(this.timeout[SAjax.TIMEOUT]);
		this.timeout[SAjax.TIMEOUT] = null;
	}
}
SAjax.TIMEOUT = Symbol('timeout');
/*Type:
-1
this.async = true
this.async = false
-2
this.set('user', '')
this.set('pass', 'none')
-3
this.open()
-4
this.addListener('send' || 'end', function)
this.removeListener('send' || 'end', function)
-5
this.getHeader(name)
this.getHeaders()
this.getSpecifcHeaders(name[, name...])
this.setHeader(name, value)
-6
this.cancel()

Type-data
-Ready State
200: OK		:	Ok
403: Forbidden:	User/Pass not accepted
404: Not Found:	Request URL not found in server
-SAjax mode
0: Response Text	: A pure string from the requested URL
1: Response XML	: A XML object with DOM properties
2: Request		: The Request object
*/
/* -Project
open	Ok
setRequestHeader	Ok
send	Ok
abort	Ok
getResponseHeader	Ok
getAllResponseHeader	Ok
overrideMimeType
onreadystatechange
readyState	Ok
timeout
withCredentials
upload
responseURL
status	Ok
statusText	Ok
responseType
response	Ok
responseText	Ok
responseXML	Ok
mozAnon
mozSystem
onloadstart	Ok
onprogress	Ok
onabort	Ok
onerror	Ok
onload	Ok
ontimeout	Ok
onloadend	Ok
addEventListener	Ok
removeEventListener	Ok
dispatchEvent
*/
