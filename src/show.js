const Collection = require('..').Collection;
const renderTable = require('./render-table');

module.exports = function(options){
	if(typeof this === 'number' || this instanceof Number){
		showPlain(this.valueOf());
	}else if(typeof this === 'object' && this.type === 'html'){
		showHTML(this.data);
	}else if(Array.isArray(this)){
		showHTML(renderTable({
			title: 'Table View',
			columns: 	Collection(this).fields().map((field)=>({headerName:field, field:field})).data(),
			rows: this
		},options));
	}else{
		console.info(this);
	}
	return this;
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