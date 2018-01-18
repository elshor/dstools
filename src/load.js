const fs = require('fs-extra');

/**
 * Load a json file
 * @alias load
 * @param   {string}     path path to json file
 * @returns {Collection} A collection wrapper around the loaded json file
 */
module.exports = function(data,path){
	return fs.readJson(path);
};