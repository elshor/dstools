const plotly = require('./plotly');
const Collection = require('..').Collection;

module.exports = function(data, field,options={}){
	return plotly.call(
		this,
		data,
		[{type:'histogram',x:field}],
		Object.assign({title:'Histogram of ' + field,xaxis:{title:field}},options)
		);
};
