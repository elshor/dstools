const axios = require('axios');
const csv = require('csv');
const Collection = require('..').Collection;
const HTML = require('..').HTML;

/**
 * Return the response of an HTTP request. If the content type of the HTTP resource is html, the return value will be an HTML wrapper. If the content type is text/csv - the function will translate the request into a collection of items. If the content type is json, the function will return a wrapped JSON object. 
 * @alias http
 * @param   {object}          options options for the HTTP request. This function uses ${@link https://www.npmjs.com/package/axios axios} npm package for executing the HTTP request. See documentation of axios for details of usage.
 * @returns  The wrapped HTTP request response
 */
module.exports = function(wrapped,options){
	return axios(options).then((response)=>{
		//determine action based on content-type and options
		if(response.headers['content-type'].startsWith('text/html')){
			return HTML(response.data);
		}else if(response.headers['content-type'].startsWith('text/csv')){
			return new Promise((resolver,rejector)=>{
				csv.parse(
					response.data,
					{auto_parse:true,trim:true,columns:true},
					(err,output)=>{
						if(err){
							rejector(err);
						}else{
							resolver(output);
						}
					});
			});
		}else{
			return response.data;
		}
	});
};

