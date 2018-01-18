const plotly = require('./plotly');
const Collection = require('..').Collection;

/**
 * Generate a scatter plot using the {@link https://plot.ly/javascript/line-and-scatter/ plotly scatter} diagram
 * @alias scatterPlot
 * @param   {string} x x axis field
 * @param   {string} y y axis field
 * @returns {HTML}   HTML wrapper for the generated HTML code
 */
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
