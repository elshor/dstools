const highcharts = require('./highcharts');
const Collection = require('..').Collection;

/**
 * Show a word cloud of terms
 * @alias wordCloud
 * @param   {string} termField  The field with the term label
 *                              @param   {string} valueField The field with the term measure - determining the size of the label
 * @param   {object} options    Additional layout configuration for the highchart API
 * @returns {HTML}   an HTML wrapper
 */
module.exports = function(data,termField, valueField,options={}){
	options.title = {text:options.title || "Word Cloud"};
	let chartData = data
	.map((row)=>({name:row[termField],weight:row[valueField]}));
	options.series = [{name:valueField, type:'wordcloud',data:chartData}];
	let ret =  highcharts(chartData,options);
	return ret;
};