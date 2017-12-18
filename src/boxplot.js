const plotly = require('./plotly');
const Collection = require('./collection');

module.exports = function(groupField,dataField){
	return plotly.call(
		this,
		Collection(this).groupBy(groupField).data().map((group)=>({
			name:group.key,
			y: Collection(group.data).column(dataField).data(),
			type: 'box'
	})), {
	xaxis: {title:groupField},
	yaxis: {title:dataField},
	title:'Box Plot'
	});
};
