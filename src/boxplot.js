const plotly = require('./plotly');
const Collection = require('..').Collection;

module.exports = function(data, groupField,dataField){
	return plotly.call(
		data,
		Collection(data).groupBy(groupField).data().map((group)=>({
			name:group.key,
			y: Collection(group.data).column(dataField).data(),
			type: 'box'
	})), {
	xaxis: {title:groupField},
	yaxis: {title:dataField},
	title:'Box Plot'
	});
};
