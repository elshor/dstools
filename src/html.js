const Wrapper = require('./wrapper');

module.exports = function(data){
	return typeof data === 'object' && data._isDSWrapper? data : Wrapper({type:'html',data:data});
};

//TODO delete - replaced by Wrapper
class HTML{
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
	HTML.prototype[name] = function(){
		let args = arguments;
		if(typeof this._data === 'object' && typeof this._data.then === 'function'){
			return module.exports(Promise.resolve(this._data).then((data)=>{
				return func.apply(data,args);
			}));
		}else{
			return new HTML(func.apply(this._data,args));
		}
	};
};
