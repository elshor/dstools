const path = require('path');
const HTML = require('./html');
const Collection = require('./collection');

module.exports = function(options){

	//go over options and fill in the data, if needed
	options.series = Array.isArray(options.series)? options.series : [options.series];
	options.series.forEach((s)=>{
		if(typeof s.data === 'string'){
			//need to load the column
			let fields = s.data.split(',').map((field)=>field.trim());
			s.data = Collection(this).column(fields.length===1?fields[0]:fields).data();
		}
	});

	//render html
	return HTML(`
		<script src="https://code.highcharts.com/highcharts.js"></script>
		<script src="https://code.highcharts.com/modules/series-label.js"></script>
		<script src="https://code.highcharts.com/modules/exporting.js"></script>
		<script src="https://code.highcharts.com/modules/histogram-bellcurve.js"></script>
		<div id="container"></div>
		<script>
Highcharts.chart('container',${JSON.stringify(options)});

 </script>
`);
};

