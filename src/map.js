/**
 * Map the collection using a mapping function. This function simply calls the Array map function
 * @alias map
 * @param   {function}   func function to use for mapping
 * @returns {Collection} The output collection
 */
module.exports = function(data, func){
	return data.map(func);
};
