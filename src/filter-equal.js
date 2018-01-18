/**
 * Filter all data elements where their field value equals value or is included in value array
 * @alias filterEqual
 * @param   {Collection}      data  input collection
 * @param   {string}          field field name
 * @param   {Object|Object[]} value value to select or an array of possible values
 * @returns {Collection}      Subset of input collection where the field equals or included in value
 */
module.exports = function(data, field,value){
	return data.filter((row)=>{
		if(Array.isArray(value)){
			 return value.includes(row[field]);
		}else{
			return row[field]===value;
		}
	});
};