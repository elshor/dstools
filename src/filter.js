/**
 * Filter data collection using the Array filter function
 * @alias filter
 * @param   {function}   func Function accepting data object and returning true if the object should be included in the output collection
 * @returns {Collection} The output collection
 */
module.exports = function(data, func){
	return data.filter(func);
};