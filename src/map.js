/**
 * Map the collection using a mapping function. This function simply calls the Array map function on the wrapped data. If the wrapped data is not an array, it wrapps it in an array, generating a single element array.
 * @alias map
 * @param   {function}   func function to use for mapping
 * @returns {Collection} The output collection
 */
module.exports = function(data, func){
	data = Array.isArray(data)? data : [data];//If data is not an array - turn it into a single element array
	return data.map(func);
};
