/**
 * changes strings into lower case. If the data input is an array, map all its elements using toLowerCase. If it is not an array and not a string, just return the input data without any transformation
 * @alias toLowerCase
 * @param   {string|Array} data input
 * @returns {string|Array}     [[Description]]
 */
module.exports = function(data){
	if(typeof data === 'string'){
		return data.toLowerCase();
	}else if(Array.isArray(data)){
		return data.map(module.exports);
	}else{
		return data;
	}
};
