let Wrapper = require('./src/wrapper');
registerFunction = Wrapper.registerFunction;
registerFunction('loadCSV',require('./src/load-csv'));
registerFunction('fields',require('./src/fields'));
registerFunction('log',require('./src/log'));
registerFunction('head',require('./src/head'));
registerFunction('tail',require('./src/tail'));
registerFunction('column',require('./src/column'));
registerFunction('highcharts',require('./src/chart'));
registerFunction('plotly',require('./src/plotly'));
registerFunction('scatterPlot',require('./src/scatter-plot'));
registerFunction('boxPlot',require('./src/boxplot'));
registerFunction('histogram',require('./src/histogram'));
registerFunction('corrmap',require('./src/corrmap'));
registerFunction('groupBy',require('./src/group-by'));
registerFunction('describe',require('./src/describe'));
registerFunction('show',require('./src/show'));
registerFunction('do',require('./src/do'));
registerFunction('map',require('./src/map'));

module.exports = {
	Collection: Wrapper,
	HTML : Wrapper,
	Wrapper: Wrapper
};
