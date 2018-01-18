const csv = require('csv');
const Collection = require('..').Collection;
const fs = require('fs');
const axios = require('axios');
const ProgressReporter = require('./progress-reporter');

function isURL(url){
	return url.match(/^(http|https)\:\/\//) !== null;
}

/**
 * Load a csv file. The file can either be on the local file system or a url 
 * path. By default, the first line is used as column names. This function uses
 * the {@link https://www.npmjs.com/package/csv csv module} and the options are
 * documented there. By default, the following options are set to true:
 * auto_parse, trim, columns.
 * @alias loadCSV
 * @param   {string}     path    path to file location or url of the CSV document
 * @param   {object}     options options as documented {@link https://www.npmjs.com/package/csv here}
 * @returns {Collection} A collection of data objects loaded from the CSV 
 *                       document
 */
module.exports = function(data,path,options){
	let reporter = ProgressReporter();
	reporter('Loading file ' + path + ' ...');
	let text = isURL(path)? 
		axios.get(path,options).then((res)=>res.data) : 
		fs.readFileSync(path);
	return Promise.resolve(text).then((text)=>{
		reporter('Processing the file ...');
		return new Promise((resolver,rejector)=>{
			let mergedOptions = {auto_parse:true,trim:true,columns:true};
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
