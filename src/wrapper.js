module.exports = function(data){
	return typeof data === 'object' && data._isDSWrapper? data : new Wrapper(data);
};

class Wrapper{
	constructor(data){
		this._isDSWrapper  = true;
		if(typeof data === 'object' && typeof data.then === 'function'){
			data.then((d)=>this._data = d);
		}
		this._data = data;
	}
	data(){
		return this._data;
	}
}

module.exports.registerFunction = function(name,func){
	Wrapper.prototype[name] = function(){
		return callFunction(func, this._data,arguments,name);
	};
};

function callFunction(func,data,args,name){
	if(typeof data === 'object' && data._isDSWrapper){
		return callFunction(func,data._data,args,name);
	}
	if(typeof data === 'object' && typeof data.then === 'function'){
		return module.exports(Promise.resolve(data).then((data)=>{
			return callFunction(func,data,args);
		}).catch((e)=>{console.error(e);}));
	}else{
		return new Wrapper(func.apply(data,args));
	}
}
