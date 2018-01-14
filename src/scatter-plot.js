const plotly = require('./plotly');
const Collection = require('..').Collection;

module.exports = function(data, x,y){
	return plotly.call(this,data,[{
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
