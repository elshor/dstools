const plotly = require('./plotly');
const Collection = require('..').Collection;

module.exports = function(field){
	return plotly.call(
		this,
		[{type:'histogram',x:field}],
		{title:'Histogram of ' + field,xaxis:{title:field}});
};
