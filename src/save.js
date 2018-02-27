const fs = require('fs-extra');
/**
 * Save the input data to a file. If the data is a string or an HTML wrapper, store the data as a text file. Otherwise, stores the data as a JSON object
 * @alias save
 * @param   {string}     path Path to output file
 * @returns {Collection} The input data
 */
module.exports = function(data,path){
	console.assert(typeof data !== undefined,'Cannot save undefined');
	if(data.type && data.type === 'html'){
		return fs.outputFile(path,data.data).then(()=>this);
	}else if(typeof data === 'string'){
		return fs.outputFile(path,data).then(()=>this);
	}else{
		return fs.outputJson(path,data).then(()=>this);
	}
};