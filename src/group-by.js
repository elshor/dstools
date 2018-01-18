const Collection = require('..').Collection;
const getFieldFunction = require('./utils').getFieldFunction;

/**
 * Group a data collection by a group field. The return value is a collection of objects with a property key representing the group value and a property data with  all data objects included in the group. In addition, the groupFunctions object is a dictionary from property name to a function calculating a group function. For each collection and each group function a property is added to the group object with the property being the groupFunctions property name and the value is the return value from the groupFunctions function. The function is in the form of func(collection) receiving as its first argument an array with all data objects belonging to the group
 * @alias groupBy
 * @param   {string|number|function} groupField     field spec as in column function
 * @param   {object}                 groupFunctions An object mapping property names and the function used to calcualte the property.
 * @returns {Collection}             A collection of groups with property key equals the group item and property data with an array of all data objects belonging to the group
 */
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



