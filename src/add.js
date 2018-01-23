/**
 * Add an element or array of elements to a collection. If the wrapped object is not a collection but a single element, turn it into an array. This function is immutable
 * @alias add
 * @param   {object|Array} element the element or elements to add
 * @returns {Collection}   the new collection
 */
module.exports = function(collection,element){
	if(!Array.isArray(collection)){
		 collection = [collection];
	}
	return collection.concat(element);
};