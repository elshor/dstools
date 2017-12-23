module.exports = function(data, fields){
	function get(data, prop){
		console.assert(['string','number','function'].includes(typeof prop),'Column field must be a field name(string), index (number) or function');
		if(typeof prop === 'string' || typeof prop === 'number'){
			return data[prop];
		}
		if(typeof prop === 'function'){
			return prop(data);
		}
	}
	if(!Array.isArray(data)){
		return [];
	}
	if(fields === 'this'){
		return data;
	}
	let ret = [];
	for(let i=0;i<data.length;++i){
		if(typeof data[i] === 'object'){
			if(Array.isArray(fields)){
				ret.push(fields.map(get.bind(this,data[i])));
			}else{
				ret.push(get(data[i],fields));
			}
		}
	}
	return ret;
};
