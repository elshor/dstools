const plotly = require('./plotly');
const Collection = require('..').Collection;

module.exports = function(x,y){
	return plotly.call(this,[{
		x: x,
		y: y,
		mode: 'markers',
		type: 'scatter'
	}], {
	xaxis: {title:x},
	yaxis: {title:y},
	title:'Scatter Plot'
	});
};
