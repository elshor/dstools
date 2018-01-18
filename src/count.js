/**
 * Count number of elements in an array excluding null and undefined. 
 * @alias count
 * @returns {number} Number Wrapper with count of elements. Call the data function to extract the actual number
 */
module.exports = function(data){
	let ret = 0;
	for(let i = 0;i<data.length;++i){
		if(typeof data[i] !== 'undefined' && data[i] !== null){
			ret++;
		}
	}
	return ret;
};