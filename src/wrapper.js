module.exports = function(data){
	return typeof data === 'object' && data._isDSWrapper? data : new Wrapper(data);
};

function isPromise(promise){
	return typeof promise === 'object' && typeof promise.then === 'function';
}

class Wrapper{
	constructor(data,type){
		this._isDSWrapper  = true;
		this._type = type;
		this._data = data;
		if(isPromise(data)){
			data.then((d)=>this._data = d);
		}
	}
	data(){
		return valueOf(this._data);
	}
	getType(){
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
	inspect(){
		let data = this.data();
		return typeof data === 'object'?`[Wrapper ${this.getType()}]` : data;
	}
}

module.exports.registerFunction = function(name,func){
	Wrapper.prototype[name] = function(){
		return callFunction(func, this.data(),arguments,name);
	};
};
function valueOf(x){
	if(typeof x == 'object' && x._isDSWrapper){
		return valueOf(x._data);
	}else if (typeof x === 'object'){
		return x.valueOf();
	}else{
		return x;
	}
}

function callFunction(func,data,args,name){
	if(isPromise(data)){
		return module.exports(Promise.resolve(data).then((data)=>{
			return callFunction(func,valueOf(data),args);
		}).catch((e)=>{console.error(e);}));
	}else{
		return new Wrapper(func.apply(valueOf(data),args));
	}
}
