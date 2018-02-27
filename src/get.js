const NOWRAP = require('..').NOWRAP;
const getFieldFunction = require('./utils').getFieldFunction;

/**
 * Get a specific item from the collection using a key field. The id argument is the value of the key field. The key argument is the key field. If the context value 'key' is set, and the key argument is not set then use the 'key' context value as the key field.
 * @alias get
 * @param   {Any}    id                           The value of key field to retrieve. This function uses strict equal to identify the relevant item
 * @param   {string} [key=this.getContext('key')] The name of the key field
 * @returns {Object} The first item with key field strictly equal id
 */
module.exports=function(data,id,key){
	key = key ||this.getContext('key');
	const fieldFunction = getFieldFunction(key);
	return NOWRAP(data.find((item)=>fieldFunction(item)===id));
};