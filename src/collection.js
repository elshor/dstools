/**
 * Switch to a new collection. The argument is the new collection to use. 
 * @alias collection
 * @param   {Array}      newCollection the new collection to use. Chaining to this function will perform actions on the new collection
 * @returns {Collection} a wrapper of the new collection
 */
module.exports = function(existingCollection,newCollection){
	return newCollection;
};