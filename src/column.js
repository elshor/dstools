module.exports = function(fields){
	function get(prop){return this[prop];}
	if(!Array.isArray(this)){
		return [];
	}
	let ret = [];
	for(let i=0;i<this.length;++i){
		if(typeof this[i] === 'object'){
			if(Array.isArray(fields)){
				ret.push(fields.map(get.bind(this[i])));
			}else{
				ret.push(this[i][fields]);
			}
		}
	}
	return ret;
};
