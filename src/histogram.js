const plotly = require('./plotly');
const Collection = require('..').Collection;

module.exports = function(data, field){
	return plotly.call(
		data,
		[{type:'histogram',x:field}],
		{title:'Histogram of ' + field,xaxis:{title:field}});
};
