const Collection = require('..').Collection;
const getFieldFunction = require('./utils').getFieldFunction;

module.exports = function(data, groupField,groupFunctions){
	let groups = {};
	let fieldFunction = getFieldFunction(groupField);
	//sort data items by group
	for(let i in data){
		let key = fieldFunction(data[i]);
		if(!groups[key]){
			groups[key] = {key:key,data:[]};
		}
		groups[key].data.push(data[i]);
	}
	//calculate groupFunctions
	for(let key in groups){
		for(let field in groupFunctions){
			groups[key][field] = dataOf(groupFunctions[field](groups[key].data));
		}
	}
	return Object.values(groups);
};

function dataOf(input){
	//if data function is defined, use it
	if(typeof input.data === 'function'){
		return input.data();
	}else{
		return input;
	}
}



