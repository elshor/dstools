const plotly = require('./plotly');
const Collection = require('..').Collection;

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
