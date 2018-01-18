const path = require('path');
const HTML = require('..').HTML;
const Collection = require('..').Collection;

/**
 * Create HTML of a highchart diagram. If the series data property is a string then treat the string as a column name and load the column from this data collection. For the options argument consult with {@link https://www.highcharts.com/docs highcharts documentation}}
 * @alias highcharts
 * @param   {object} options the options object to pass to the highchart function.
 * @returns {HTML}   HTML wrapper
 */
module.exports = function(data, options){
	//go over options and fill in the data, if needed
	options.series = Array.isArray(options.series)? options.series : [options.series];
	options.series.forEach((s)=>{
		if(typeof s.data === 'string'){
			//need to load the column
			s.data = Collection(data).column(s.data).data();
		}
	});
//TODO options for module
	//render html
	let ts = new Date().getTime();
	return HTML(`
		<script src="https://code.highcharts.com/highcharts.js"></script>
		<script src="https://code.highcharts.com/modules/wordcloud.js"></script>
		<div id="hc-${ts}"></div>
		<script>
		function hc${ts}(){Highcharts.chart('hc-${ts}',${JSON.stringify(options)})}
		if(window.Highcharts){hc${ts}();
		}else{
			require([
				'https://code.highcharts.com/highcharts.js',
				'https://code.highcharts.com/modules/wordcloud.js'
			], function(highcharts){window.highcharts = highcharts;hc${ts}();
			});
		}
		</script>
`);
};

