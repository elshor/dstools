const plotly = require('./plotly');
const Collection = require('..').Collection;

/**
 * Generate a histogram using the {@link https://plot.ly/javascript/histograms/ plotly library}
 * @alias histogram
 * @param   {string|number|function} field   field spec
 * @param   {object}                 options Optional layout options for the plotly library
 * @returns {HTML}                   HTML wrapper of histogram visualization
 */
module.exports = function(data, field,options={}){
	return plotly.call(
		this,
		data,
		[{type:'histogram',x:field}],
		Object.assign({title:'Histogram of ' + field,xaxis:{title:field}},options)
		);
};
