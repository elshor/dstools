const Collection = require('./collection');

module.exports = function(){
	if(!Array.isArray(this)){
		return Collection([]);
	}else{
		let obj = {};
		this.forEach((elem)=>{
			if(typeof elem === 'object'){
				for(let prop in elem){
					obj[prop] = true;
				}
			}
		});
		return Object.keys(obj);
	}
};

