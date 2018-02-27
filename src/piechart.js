const plotly = require('./plotly');
const Collection = require('..').Collection;

/**
 * Generate a Pie Chart using the {@link https://plot.ly/javascript/pie-charts/ plotly library}
 * @alias piechart
 * @param   {string|number|function} field   field spec
 * @param   {object}                 options Optional layout options for the plotly library
 * @returns {HTML}                   HTML wrapper of histogram visualization
 */
module.exports = function(data, groupField,valueFunction='count',options={}){
	//need to group data to create piechart
	if(typeof valueFunction === 'string'){
		func = function(data){return Collection(data)[valueFunction]();};
	}else{
		func = valueFunction;
	}
	let groups = this.groupBy(groupField,{value:func});
	return plotly.call(
		this,
		data,
		[{
			type:'pie',
			values:groups.column('value').data(),
			labels:groups.column('key').data()
		}],
		Object.assign({title:'Pie Chart of ' + groupField,xaxis:{title:groupField}},options)
		);
};
