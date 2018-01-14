const csv = require('csv');
const Collection = require('..').Collection;
const fs = require('fs');
const axios = require('axios');
const ProgressReporter = require('./progress-reporter');

function isURL(url){
	return url.match(/^(http|https)\:\/\//) !== null;
}
module.exports = function(data,path,options){
	let reporter = ProgressReporter();
	reporter('Loading file ' + path + ' ...');
	let text = isURL(path)? 
		axios.get(path,options).then((res)=>res.data) : 
		fs.readFileSync(path);
	return Promise.resolve(text).then((text)=>{
		reporter('Processing the file ...');
		return new Promise((resolver,rejector)=>{
			let mergedOptions = {auto_parse:true,audo_parse_date:true,trim:true,columns:true};
			Object.assign(mergedOptions,options||{});
			csv.parse(text,mergedOptions,(err,output)=>{
				if(err){
					reporter('Got error while parsing file: ' + err.toString());
					reporter();
					rejector(err);
				}else{
					reporter('Finished loading ' + output.length + ' rows from ' + path);
					reporter();
					resolver(output);
				}
			});
		});
	});
};
