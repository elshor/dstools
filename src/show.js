const Collection = require('..').Collection;
const renderTable = require('./render-table');

module.exports = function(data, options){
	if(typeof data === 'number' || data instanceof Number){
		showPlain(data.valueOf());
	}else if(typeof data === 'object' && data.type === 'html'){
		showHTML(data.data);
	}else if(Array.isArray(data)){
		showHTML(renderTable({
			title: 'Table View',
			columns: 	Collection(data).fields().map((field)=>({headerName:field, field:field})).data(),
			rows: data
		},options));
	}else{
		console.info(data);
	}
	return data;
};

function showHTML(html){
	if(typeof global.$$ === 'undefined'){
		console.info(html);
	}else{
		$$.html(html);
	}
}
function showPlain(text){
	console.info(text);
}