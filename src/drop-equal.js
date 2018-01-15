const getFieldFunction = require('./utils').getFieldFunction;
module.exports =  function(data,field,value){
	const fieldFunction = getFieldFunction(field);
	if(Array.isArray(value)){
		let dictionary = {};
		value.forEach((item)=>dictionary[item]=true);
		return data.filter((element)=>!dictionary[fieldFunction(element)]);
	}else{
		return data.filter((element)=>fieldFunction(element)!==value);
	}
};

