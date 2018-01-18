/**
 * add a field to a collection. This is an immutable function. It creates a new collection but does not modify the original collection. If the value is an array then the function matches the data object with the value of the same index. If the value is a function, addField calculates the value of the field using the function, passing it the data object as argument. Otherwise, the value is copied to each data object as field property value.
 * @throws {Error} [[Description]]
 * @alias addField
 * @param   {Collection}     collection data collection
 * @param   {string}         field      name of new field
 * @param   {function|Array|any} value      either an array to use as the data or a function that accepts the record as first argument or a value to set for each data object
 * @returns {Collection}     the original collection with the added field
 */
module.exports = function(collection, field, value){
	if(Array.isArray(value)){
		return collection.map((record,index)=>{
			let fieldObject = {};
			fieldObject[field] = value[index];
			return Object.assign({},record,fieldObject);
		});
	}else if(typeof value === 'function'){
		return collection.map((record,index)=>{
			let fieldObject = {};
			fieldObject[field] = value(record);
			return Object.assign({},record,fieldObject);
		});
	}else{
		return collection.map((record,index)=>{
			let fieldObject = {};
			fieldObject[field] = value;
			return Object.assign({},record,fieldObject);
		});
	}
};
