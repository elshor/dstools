const t = require('tap');
const ds = require('..');
const Collection = ds.Collection;
const HTML = ds.HTML;
t.test('sort and sortDesc',function(t){
	t.plan(4);
	ds.Collection()
	.loadCSV(__dirname + '/data1.csv')
	.sort((b,a)=>a['field 2']-b['field 2'])
	.do((x)=>t.equals(x[0]['field 2'],12,'sort with function'))
	.sort('field 2')
	.do((x)=>t.equals(x[0]['field 2'],1,'sort with field name'))
	.sortDesc('field 2')
	.do((x)=>t.equals(x[0]['field 2'],12,'sort desc'))
	.sortDesc((b,a)=> a['field 2']-b['field 2'])
	.do((x)=>t.equals(x[0]['field 2'],1,'sort desc with function'));
});
