let Wrapper = require('./src/wrapper');

module.exports = {
	Collection: Wrapper,
	HTML : function(data){return  Wrapper({type:'html',data:data});},
	Wrapper: Wrapper,
	NOWRAP: function(data){return {_NOWRAP:true,data:data};},
	ProgressReporter : require('./src/progress-reporter')
};

registerFunction = Wrapper.registerFunction;
registerFunction('loadCSV',require('./src/load-csv'));
registerFunction('load',require('./src/load'));
registerFunction('fields',require('./src/fields'));
registerFunction('addField',require('./src/add-field'));
registerFunction('head',require('./src/head'));
registerFunction('tail',require('./src/tail'));
registerFunction('column',require('./src/column'));
registerFunction('plotly',require('./src/plotly'));
registerFunction('table',require('./src/render-table'));
registerFunction('scatterPlot',require('./src/scatter-plot'));
registerFunction('boxPlot',require('./src/boxplot'));
registerFunction('histogram',require('./src/histogram'));
registerFunction('piechart',require('./src/piechart'));
registerFunction('corrmap',require('./src/corrmap'));
registerFunction('groupBy',require('./src/group-by'));
registerFunction('get',require('./src/get'));
registerFunction('describe',require('./src/describe'));
registerFunction('show',require('./src/show'));
registerFunction('do',require('./src/do'));
registerFunction('map',require('./src/map'));
registerFunction('forEach',require('./src/for-each'));
registerFunction('filter',require('./src/filter'));
registerFunction('filterEqual',require('./src/filter-equal'));
registerFunction('drop',require('./src/drop'));
registerFunction('dropEqual',require('./src/drop-equal'));
registerFunction('sort',require('./src/sort'));
registerFunction('sortDesc',require('./src/sort-desc'));
registerFunction('toLowerCase',require('./src/to-lower-case'));
registerFunction('save',require('./src/save'));
registerFunction('highcharts',require('./src/highcharts'));
registerFunction('dropStopwords',require('./src/drop-stopwords'));
registerFunction('wordCloud',require('./src/wordcloud'));
registerFunction('terms',require('./src/terms'));
registerFunction('merge',require('./src/merge'));
registerFunction('spread',require('./src/spread'));
registerFunction('http',require('./src/http'));
registerFunction('context',require('./src/context'));
registerFunction('add',require('./src/add'));
registerFunction('collection',require('./src/collection'));

function registerColumnFunction(name, func){
	registerFunction(name,function(data,field,options){
		let vec = Wrapper(data).column(typeof field === 'undefined'?'this':field).data();
		let ret = func(vec,options);
		return ret;
	});
}

registerColumnFunction('count',require('./src/count'));

const jStat = require('jstat');
'sum,sumsqrd,sumsqerr,product,min,max,mean,meansqerr,geomean,median,cumsum,cumprod,diff,rank,range,variance,deviation,stdev,skewness,kurtosis,coeffvar,quartiles,quantiles,percentile'.split(',').forEach((name)=>{
	registerColumnFunction(name,jStat[name]);
});
