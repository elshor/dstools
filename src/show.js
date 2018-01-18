const Collection = require('..').Collection;
const renderTable = require('./render-table');

/**
 * Show the wrapped data in html or plain text view. This function is used in Jupyter notebook context to display visualizations of the data. If the data is a collection, the data is displayed as an HTML table. If it is an HTML wrapper, the html is displayed. 
 * @alias show
 * @param   {object}     options.fields options spec for columns where headerName is the title to show in the header and field is the name of the field to display in that column
 * @returns  The original input data
 */
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