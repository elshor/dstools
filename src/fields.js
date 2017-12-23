const Collection = require('..').Collection;

module.exports = function(data){
	if(!Array.isArray(data)){
		return Collection([]);
	}else{
		let obj = {};
		data.forEach((elem)=>{
			if(typeof elem === 'object'){
				for(let prop in elem){
					obj[prop] = true;
				}
			}
		});
		return Object.keys(obj);
	}
};

