/**
 * Return the last n items in a collection
 * @alias tail
 * @param   {number}     num=5 number of items to return
 * @returns {Collection} A collection containing the last n items
 */

module.exports = function(data,num=5){
	return data.slice(-num);
};
