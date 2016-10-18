function $SAjax(url, method, data, async, mode, callback){
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
		var data = this.method == 'GET' ? '?' + this.data : '';
		this.request.open(
			this.location,
			this.method + data,
			this.async,
			this.user,
			this.pass
		);
	};
	this.send = function(){
		this.method == 'GET' ? this.request.send() : this.request.send(data);
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
