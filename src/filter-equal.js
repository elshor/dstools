module.exports = function(data, field,value){
	return data.filter((row)=>row[field]===value);
};