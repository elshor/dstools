/**
 * Drop a collection of items from this collection. This functor takes as argument the collection of items to drop.
 * @alias drop
 * @param   {Collection} toDrop collection of items to drop. Can be an array or a dstools wrapped collection
 * @returns {Collection} The modified collection
 */
module.exports = function(collection,toDrop){
	return this.dropEqual('this',toDrop.valueOf());
};