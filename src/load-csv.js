const csv = require('csv');
const Collection = require('./collection');
const fs = require('fs');

module.exports = function(path,options){
	return new Promise((resolver,rejector)=>{
		let text = fs.readFileSync(path);
		let mergedOptions = {auto_parse:true,audo_parse_date:true,trim:true,columns:true};
		Object.assign(mergedOptions,options||{});
		csv.parse(text,mergedOptions,(err,output)=>{
			if(err){
				rejector(err);
			}else{
				console.info('Finished loading',output.length,'rows from',path);
				resolver(output);
			}
		});
	});
};
