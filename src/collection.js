const Wrapper = require('./wrapper');

module.exports = function(data){
	return typeof data === 'object' && data._isDSWrapper? data : Wrapper(data);
};

//TODO remove collection - replaced by wrapper
class Collection{
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
	show(){
		return module.exports(Promise.resolve(this._data).then((data)=>{
			if(typeof data === 'object' && data._isDSWrapper){
				return data.show();
			}
			console.info(JSON.stringify({_pixiedust:true,type:'display',data:data}));
			return this;
		}));
	}
}

module.exports.registerFunction = function(name,func){
	Collection.prototype[name] = function(){
		let args = arguments;
		if(typeof this._data === 'object' && typeof this._data.then === 'function'){
			return module.exports(Promise.resolve(this._data).then((data)=>{
				return func.apply(data,args);
			}));
		}else{
			return new Collection(func.apply(this._data,args));
		}
	};
};

