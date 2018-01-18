/**
* Call the Array join function on the input data collection
* @alias merge
* @param {string} options.sep='\n' The separator to use when joining the strings
* @returns {string} The output string
*/
module.exports = function(vec,options={}){
	return vec.join(options.sep || '\n');
};