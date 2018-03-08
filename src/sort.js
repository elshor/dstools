const getFieldFunction = require('./utils').getFieldFunction;

/**
 * Sort the data collection in ascending order
 * @alias sort
 * @param   {string|number|function} byField The field to use for sorting - can be a function in which the data object is its first argument and the return value is the value to sort upon
 * @param   {boolean}                desc true if order should be descending. Default ascending
 * @returns {Collection}             The sorted collection
 */
module.exports = function(data, byField,desc=false){
	//create ret array
	let ret = Array.from(data);
	const fieldFunction = getFieldFunction(byField);
	byFieldFunction = function(a,b){
		let rev = desc? -1 : 1;
		if(fieldFunction(a) < fieldFunction(b)){
			return -1 * rev;
		}else if(fieldFunction(a) > fieldFunction(b)){
			return 1 * rev;
		}else{
			return 0;
		}
	};
	return ret.sort(byFieldFunction);
};
