function SAjax(url, method, data){
	this.location = url;
	this.method = method;
	this.data = data;
	this.async = true;
	this.request = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
	this.set(prop, val){
		this[ prop ] = val;
	};
	this.call = function(prop, code, response){
		var list = this.listeners[ prop ];
		for(var i in list) list[ i ].call(null, code, response);
	};
	this.open = function(){
		this.parseData();
		var data = this.method == 'GET' ? '?' + this.parsedData : '';
		this.request.open(
			this.location,
			this.method + data,
			this.async,
			this.user,
			this.pass
		);
	};
	this.send = function(){
		this.parseData();
		this.method == 'GET' ? this.request.send() : this.request.send( this.parsedData );
		this.call('send');
	};
	this.cancel = () => this.request.abort();
	this.getHeaders = () => this.request.getAllResponseHeaders();
	this.getHeader = (name) => this.getResponseHeader(name);
	this.getSpecificHeaders = function(){
		var ret = [], arg = arguments;
		for(var x in arg) ret.push( this.getResponseHeader( arg[x] ) );
		return ret;
	};
	this.setHeader = (name, value) => this.request.setRequestHeader(name, value);
	this.listeners = {
		'send':[],
//		'error':[],
//		'sucess':[]
		'end':[]
	};
	this.addListener = function(event, func){
		switch(event){
			case 'readystatechange':
			case 'loadstart':
			case 'progress':
			case 'abort':
			case 'error':
			case 'load':
			case 'timeout':
			case 'loadend':
				this.request.addEventListener.apply(null, arguments);
				break;
			default: this.listeners[ event ].push(func); return 0;
		}
	};
	this.removeListener = function(event, func){
		switch(event){
			case 'readystatechange':
			case 'loadstart':
			case 'progress':
			case 'abort':
			case 'error':
			case 'load':
			case 'timeout':
			case 'loadend':
				this.request.removeEventListener.apply(null, arguments);
				break;
			default:
				var index = this.listeners[ event ].findIndex(func);
				this.listeners[ event ][ index ] = null; return 0;
	};
	this.request.onreadystatechange = function(){
		if(this.request.readyState == 4) this.end();
	};
	this.end = function(){
		var response = this.mode == 0 ? this.request.responseText : (this.mode == 1 ? this.request.responseXML : this.request);
		this.call('end',
			this.request.readyState,
			response
		);
		this.lastState = this.request.readyState;
	};
	this.parseData = function(){
		var data = this.data;
		var ret = '';
		if(data.constructor.toString().toLowerCase().indexOf('string') > -1 && isNaN(data)){
			for(var x in data){
				ret += encodeURI(x) + '=' + encodeURI(data[x]) + '&';
			}
		}
		this.parsedData = ret || data;
	};
	this.timeout = {
		/*
		-persistence
		1:	Cancel on error
		2:	Ignore errors
		3:	Log errors
		*/
		init : function(){
			if(this.persistence < 2 && this.lastState != 200) return;
			else if(this.persistence == 3) this.addListener('error', function(e){
				console.error(e);
			});
			this.send();
		}
	};
	this.setTimeout = function(time, persistence, call_after, call_before){
		this.timeout.persistence = persistence || 1;
		if(call_after) this.timeout.call_after = call_after;
		else this.timeout.call_after = null;
		if(call_before) this.timeout.call_before = call_before;
		else this.timeout.call_before = null;
		this.timeout['var'] = setTimeout(time, this.timeout.init);
	};
	this.clearTimeout = function(){
		clearTimeout(this.timeout['var']);
		this.timeout['var'] = null;
	};
}
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
