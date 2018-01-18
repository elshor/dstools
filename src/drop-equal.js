const getFieldFunction = require('./utils').getFieldFunction;

/**
 * Drop data objects that their field equals the value or any object in the value when the value is an array. The field argument can be a field name, index or function in the form of func(dataObject). Values are compared using strict comparison operator. This function is immutable - it returns the collection excluding the dropped items. It does not modify the original data collection
 * @alias dropEqual
 * @param   {number|string|function} field the field to query
 * @param   {any}                    value the value to compare
 * @returns {Collection}             collection of input data objects excluding the dropped items
 */
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

