/**
 * Return the first n items in a collection
 * @alias head
 * @param   {number}     num=5 number of items to return
 * @returns {Collection} A collection containing the first n items
 */
module.exports = function(data, num=5){
	return data.slice(0,num);
};
