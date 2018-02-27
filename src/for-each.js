/**
 * Execute the callback for each element in the data collection. This function simply calls the array forEach function
 * @param   {function}   callback function to call for each element
 * @returns {Collection} This collection wrapper
 */
module.exports=function(data,callback){
	data.forEach(callback);
	return this;
};