const Collection = require('..').Collection;
const renderTable = require('./render-table');

module.exports = function(data, options={}){
	options.fields = options.fields || Collection(data).fields().data();
	if(typeof data === 'number' || data instanceof Number){
		showPlain(data.valueOf());
	}else if(typeof data === 'object' && data.type === 'html'){
		showHTML(data.data);
	}else if(Array.isArray(data)){
		showHTML(renderTable({
			title: 'Table View',
			columns: 	options.fields.map((field)=>({headerName:field, field:field})),
			rows: data
		},options).data().data);
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