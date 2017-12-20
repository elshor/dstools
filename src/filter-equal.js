module.exports = function(field,value){
	return this.filter((row)=>row[field]===value);
};