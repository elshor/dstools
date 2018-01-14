const fs = require('fs-extra');

//load a json file
module.exports = function(data,path){
	return fs.readJson(path);
};