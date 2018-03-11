const ValueViewerSymbol = require("@runkit/value-viewer").ValueViewerSymbol;
const process = require('process');

module.exports = function(data=[],type=undefined,options={}){
	return typeof data === 'object' && data._isDSWrapper? data : 
	new Wrapper(data,type,options);
};

function isPromise(promise){
	return typeof promise === 'object' && typeof promise.then === 'function';
}
function isWrapper(obj){
	return typeof obj === 'object' && obj._isDSWrapper;
}
class Wrapper{
	constructor(data,type,options){
		options = options || {};
		this._isDSWrapper  = true;
		this._type = type;
		this._context = {};
		this._context = Object.assign(this._context,process.env,options.context);
		this._assignData(data);
	}
	_assignData(data){
		this._data = data;//until promise is resolved
		if(isPromise(data)){
			//data is a promise - neet to wait until it resolves
			data.then((resolved)=>this._assignData(resolved));
			if(this._catchFunction){
				//catch function was specified - need to attach to promise
				data.catch(this._catchFunction);
			}
		}else if(isWrapper(data)){
			//we got a wrapper - copy its data
			this._type = data._type || this._type;
			this._data = data._data;
			Object.assign(this._context,data._context);
			if(isPromise(this._data)){
				//check if the wrapper wrapps a promise
				this._assignData(this._data);
			}
		}else{
			this._data = data;
		}
		if(typeof this._data === 'object' && this._data.type && this._data.type==='html'){
			this[ValueViewerSymbol] ={
				title: "HTML Viewer",
				HTML: this._data.data
			};
		}
	}
	data(){
		return valueOf(this._data);
	}
	valueOf(){
		return valueOf(this._data);
	}
	getType(){
		if(this._type){
			return _type;
		}
		let data = this.data();
		let type = typeof data;
		if(type !== 'object'){
			return type;
		}
		if(typeof data.type === 'string'){
			return data.type;
		}
		if(Array.isArray(data)){
			return 'collection';
		}
		return 'object';
	}
	getContext(name){
		return typeof name === 'string'? this._context[name] : this._context;
	}
	inspect(){
		let data = this.data();
		return typeof data === 'object'?`[Wrapper ${this.getType()}]` : data;
	}
	catch(callback){
		this._catchFunction = callback;
		if(isPromise(this._data)){
			this._data.catch(callback);
		}
	}
}

module.exports.registerFunction = function(name,func){
	Wrapper.prototype[name] = function(){
		return callFunction(func, this.data(),arguments,name,this);
	};
};
function valueOf(x){
	if(isWrapper(x)){
		return valueOf(x._data);
	}else if(x===undefined || x===null){
		return x;
	}else{
		return x.valueOf();
	}
}

function callFunction(func,data,args,name,thisObject){
	if(isPromise(data)){
		return module.exports(Promise.resolve(data).then((data)=>{
			return callFunction(func,valueOf(data),args,name,thisObject);
		}).catch((e)=>{console.error(e);}));
	}else{
		let ret = func.call(thisObject,valueOf(data),...args);
		if(typeof ret === 'object' && ret._NOWRAP){
			//should not wrap return value
			return ret.data;
		}
		return new Wrapper(
			ret,
			undefined,
			{context:thisObject? thisObject.getContext() : {}});
	}
}
