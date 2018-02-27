const _ = require('underscore');

/**
 * Expand the original collection into a new possibly larger collection using the input function. The function is called for all items in the base collection. It may return a single item treated as an array of one item, or an array of items. The return value is a concatenation of all returned values
 * @param   {function}   func the spread function taking the item as first argument and returning an array of items or an item.
 * @returns {Collection} A concatenation of all values returned by the func.
 */
module.exports = function(data,func){
	return Promise
		.all(data.map(func))
		.then((arr)=>arr.map((item)=>item.valueOf()))
		.then((arr)=>_.flatten(arr,true));
};

