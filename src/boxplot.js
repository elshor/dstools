const plotly = require('./plotly');
const Collection = require('..').Collection;

/**
 * Display an HTML boxplot using the {@link https://plot.ly/javascript/box-plots/ plotly library}. By default the bins are distributed automatically. For manually 
 * defined bins, set the bins property of layout to an array of bin borders (e.g.
 * [5,10,15,20])
 * 
 * @alias boxPlot
 * @param   {string|number|function} groupField Field specifying the groups - will appear on the X axis. See column function for possible values
 * @param   {string|number|function} dataField  The field containing the numerical data represented within the box (Y axis)
 * @param   {object}                 layout     layout for the diagram
 * @param {Array}                    layout.bins an array of bin separators
 * @returns {HTML}                   HTML wrapper with the HTML used to display the boxplot
 */
module.exports = function(data, groupField,dataField,layout={}){
	//if bins property is specified in layout - need to first arrange data in bins
	let plotlyData = layout.bins? binsData(data,groupField,dataField,layout.bins)
	: Collection(data).groupBy(groupField).data().map((group)=>({
			name:group.key,
			y: Collection(group.data).column(dataField).data(),
			type: 'box'
		}));
	layout = Object.assign({
		xaxis: {title:groupField},
		yaxis: {title:dataField},
		title:'Box Plot'
		},layout);
	
	return plotly.call(this,data,plotlyData,layout);
};

function binsData(data,groupField,dataField,seps){
	let bins = [];
	
	//generate the bins
	bins.push({name:'< '+seps[0],y:[],type:'box'});
	for(let i=1;i<seps.length;++i){
			bins.push({name:`${seps[i-1]}-${seps[i]}`,y:[],type:'box'});
	}
	bins.push({name:'>= '+seps[seps.length-1],y:[],type:'box'});
	
	//populate the bins
	data.forEach((item)=>{
		for(let i=0;i<seps.length;++i){
			if(item[groupField] < seps[i]){
				bins[i].y.push(item[dataField]);
				return;
			}
		}
		bins[seps.length].y.push(item[dataField]);
	});
	return bins;
}

