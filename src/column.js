module.exports = function(fields){
	function get(prop){
		console.assert(['string','number','function'].includes(typeof prop),'Column field must be a field name(string), index (number) or function');
		if(typeof prop === 'string' || typeof prop === 'number'){
			return this[prop];
		}
		if(typeof prop === 'function'){
			return prop(this);
		}
	}
	if(!Array.isArray(this)){
		return [];
	}
	if(fields === 'this'){
		return this;
	}
	let ret = [];
	for(let i=0;i<this.length;++i){
		if(typeof this[i] === 'object'){
			if(Array.isArray(fields)){
				ret.push(fields.map(get.bind(this[i])));
			}else{
				ret.push(get.call(this[i],fields));
			}
		}
	}
	return ret;
};
