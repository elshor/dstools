const t = require('tap');
const ds = require('..');
const Collection = ds.Collection;
const HTML = ds.HTML;
t.test('render html plots',function(t){
	t.plan(11);
	ds.Collection().loadCSV(__dirname + '/data1.csv').do((x)=>{
		let boxPlotText = `[{"name":"a","y":[1,2,5],"type":"box"},{"name":"b","y":[1,4,6,7],"type":"box"},{"name":"c","y":[10],"type":"box"},{"name":"d","y":[11,12],"type":"box"}], {"xaxis":{"title":"field 1"},"yaxis":{"title":"field 2"},"title":"Box Plot"});`;
		t.ok(Collection(x).boxPlot('field 1','field 2')
				 .data().data.includes(boxPlotText),'boxplot');
		
		let corrmapText = `,[{"z":[[0.9999999999999999,0.9879609885780273,null],[0.9879609885780272,1.0000000000000002,null],[null,null,null]],"x":["id","field 2","field 3"],"y":["id","field 2","field 3"],"type":"heatmap"}], {"title":"Correlation Map"});`;
		t.ok(Collection(x).corrmap().data().data.includes(corrmapText),'corrmap');
		
		let describeText = `[{"measure":"column","value":"field 2"},{"measure":"count","value":10},{"measure":"mean","value":5.9},{"measure":"std","value":3.8587562763149474},{"measure":"min","value":1},{"measure":"25%","value":2},{"measure":"50%","value":5},{"measure":"75%","value":10},{"measure":"max","value":12}]`;
		t.ok(JSON.stringify(Collection(x).describe('field 2').data()).includes(describeText), 'describe');
		
		let tableText = `<table><thead class="theader"><tr><th class="header-field">id</th><th class="header-field">field 1</th><th class="header-field">field 2</th><th class="header-field">field 3</th></tr></thead><tbody><tr class="table-row"><td class="table-cell">1</td><td class="table-cell">a</td><td class="table-cell">1</td><td class="table-cell">10</td></tr><tr class="table-row"><td class="table-cell">2</td><td class="table-cell">b</td><td class="table-cell">1</td><td class="table-cell">10</td></tr><tr class="table-row"><td class="table-cell">3</td><td class="table-cell">a</td><td class="table-cell">2</td><td class="table-cell">10</td></tr><tr class="table-row"><td class="table-cell">4</td><td class="table-cell">b</td><td class="table-cell">4</td><td class="table-cell">10</td></tr><tr class="table-row"><td class="table-cell">5</td><td class="table-cell">a</td><td class="table-cell">5</td><td class="table-cell">10</td></tr><tr class="table-row"><td class="table-cell">6</td><td class="table-cell">b</td><td class="table-cell">6</td><td class="table-cell">10</td></tr><tr class="table-row"><td class="table-cell">7</td><td class="table-cell">b</td><td class="table-cell">7</td><td class="table-cell">10</td></tr><tr class="table-row"><td class="table-cell">8</td><td class="table-cell">c</td><td class="table-cell">10</td><td class="table-cell">10</td></tr><tr class="table-row"><td class="table-cell">9</td><td class="table-cell">d</td><td class="table-cell">11</td><td class="table-cell">10</td></tr><tr class="table-row"><td class="table-cell">10</td><td class="table-cell">d</td><td class="table-cell">12</td><td class="table-cell">10</td></tr></tbody></div></table>`;
		
		let wordcloudText = '{"title":{"text":"test title"},"series":[{"name":"value","type":"wordcloud","data":[{"name":"one","weight":1},{"name":"two","weight":2},{"name":"three","weight":3}]}]})}';
		
		let highcartsText = `{"title":{"text":"highcharts diagram"},"series":[{"name":"first","data":[1,1,2,4,5,6,7,10,11,12]},{"name":"second","data":[10,10,10,10,10,10,10,10,10,10]}]})}`;
		let table = require('../src/render-table')({
			columns: 	Collection(x).fields().map((field)=>({headerName:field, field:field})).data(),
			rows: x
		});
		t.ok(table.data().data.includes(tableText), 'renderTable');
		table = require('../src/render-table')({
			title:'my test title',
			columns: 	Collection(x).fields().map((field)=>({headerName:field, field:field})).data(),
			rows: x
		});
		t.ok(table.data().data.includes('my test title'), 'renderTable with title');

		let histogramText = `[{"type":"histogram","x":["a","b","a","b","a","b","b","c","d","d"]}], {"title":"Histogram of field 1","xaxis":{"title":"field 1"}});`;
		t.ok(Collection(x).histogram('field 1').data().data.includes(histogramText),'histogram');
		
		let scatterPlotText = `[{"x":["a","b","a","b","a","b","b","c","d","d"],"y":[1,1,2,4,5,6,7,10,11,12],"mode":"markers","type":"scatter"}], {"xaxis":{"title":"field 1"},"yaxis":{"title":"field 2"},"title":"Scatter Plot"});`;
		t.ok(Collection(x).scatterPlot('field 1','field 2').data().data.includes(scatterPlotText),'scatterPlot');
		
		t.ok(Collection([
			{label:'one',value:1},
			{label:'two',value:2},
			{label:'three',value:3}
		]).wordCloud('label','value',{title:'test title'}).data().data.includes(wordcloudText));
		t.ok(Collection([
			{label:'one',value:1},
			{label:'two',value:2},
			{label:'three',value:3}
		]).wordCloud('label','value').data().data.includes(
			wordcloudText.replace('test title','Word Cloud')));
		
		t.ok(Collection(x).highcharts({
			title: {text: 'highcharts diagram'},
			series: [{name:'first',data:'field 2'},{name:'second',data:'field 3'}]
		}).data().data.includes(highcartsText),'highcharts diagram');
		
		let boxplotBinsText = `[{"name":"< 4","y":[1,1,2],"type":"box"},{"name":"4-6","y":[4,5],"type":"box"},{"name":">= 6","y":[6,7,10,11,12],"type":"box"}]`;
		t.ok(Collection(x).boxPlot('id','field 2',{bins:[4,6]})
				 .data().data.includes(boxplotBinsText),'boxplot with bins');
	});

});
