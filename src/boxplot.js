const plotly = require('./plotly');
const Collection = require('..').Collection;

/**
 * Display an HTML boxplot using the {@link https://plot.ly/javascript/box-plots/ plotly library}
 * @alias boxPlot
 * @param   {string|number|function} groupField Field specifying the groups - will appear on the X axis. See column function for possible values
 * @param   {string|number|function} dataField  The field containing the numerical data represented within the box (Y axis)
 * @param   {object}                 layout     layout for the diagram
 * @returns {HTML}                   HTML wrapper with the HTML used to display the boxplot
 */
module.exports = function(data, groupField,dataField,layout){
	return plotly.call(
		this,
		data,
		Collection(data).groupBy(groupField).data().map((group)=>({
			name:group.key,
			y: Collection(group.data).column(dataField).data(),
			type: 'box'
	})), Object.assign({
	xaxis: {title:groupField},
	yaxis: {title:dataField},
	title:'Box Plot'
	},layout));
};
