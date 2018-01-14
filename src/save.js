const fs = require('fs-extra');
module.exports = function(data,path){
	if(data.type && data.type === 'html'){
		return fs.outputFile(path,data.data).then(()=>this);
	}else if(typeof data === 'string'){
		return fs.outputFile(path,data);
	}else{
		return fs.outputJson(path,data).then(()=>this);
	}
};