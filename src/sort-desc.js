/**
 * Sort the data collection in descending order
 * @alias sortDesc
 * @param   {string|number|function} byField The field to use for sorting - can be a function in which the data object is its first argument
 * @returns {Collection}             The sorted collection
 */
module.exports = function(data, byField){
	return this.sort(byField,true);//true - descending order
};
