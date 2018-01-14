const highcharts = require('./highcharts');
const Collection = require('..').Collection;

/**
 * Show a word cloud of terms
 * @param   {[[Type]]} text    [[Description]]
 * @param   {object}   options [[Description]]
 * @returns {[[Type]]} [[Description]]
 */
module.exports = function(data,termField, valueField,options={}){
	options.title = {text:options.title || "Word Cloud"};
	let chartData = data
	.map((row)=>({name:row[termField],weight:row[valueField]}));
	options.series = [{name:valueField, type:'wordcloud',data:chartData}];
	let ret =  highcharts(chartData,options);
	return ret;
};