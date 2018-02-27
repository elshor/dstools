/* jshint -W053 */
const t = require('tap');
const ds = require('..');
const Collection = ds.Collection;
const HTML = ds.HTML;
const PORT = 8877;
let server;

//create server to test load csv from server
function startServer(port){
	server = require('http').createServer((req, res) => {
		let data = require('fs').readFileSync(__dirname + '/data1.csv');
		res.end(data);
	});
	server.listen(port);
}
startServer(PORT);

t.test('basic load',function(t){
	t.plan(42);
	ds.Collection().loadCSV('http://localhost:'+PORT).do((x)=>{
		t.equal(x.length,10,'load csv from url');
		server.close();
	});
	ds.Collection().loadCSV(__dirname + '/data1.csv').do((x)=>{
		t.equal(x.length,10,'loaded 10 rows');
		t.equal(Collection([1,2,null,undefined,3]).count().data(),3,'count with null and undefined elements');
		t.equal(Collection(x).head().count().data(),5,'head function without args');
		t.equal(Collection(x).head(7).count().data(),7,'head function with 7');
		t.equal(Collection(x).tail(7).count().data(),7,'tail function with 7');
		t.equal(Collection(x).tail().count().data(),5,'tail function with default value');
		t.equal(Collection(x).tail(7).data()[0].id,4,'tail function with 7, first element id is 4');
		t.equal(ds.HTML('html text').data().type,'html','create html wrapper');
		t.equal(Collection(x).sum('field 3').data(),100,'sum function');
		t.equal(Collection(x).column('field 3').sum().data(),100,'sum of vector using a column');
		t.equal(Collection(x).column('field 3').column('this').sum().data(),100,'this column');
		t.equal(Collection(x).fields().data()[2],'field 2','field function');
		t.equal(HTML('html text').fields().data().length,0,'when data is not an array, return empty array');
		
		let twocolumns = Collection(x).column(['field 2','field 1']).data();
		t.equal(twocolumns[0].length,2,'retreive two columns');
		t.equal(twocolumns[0][0], 1,'retreive two columns - ensure data correct 1');
		t.equal(twocolumns[1][1], 'b','retreive two columns - ensure data correct 2');
		t.equal(HTML('html').column('x').data().length,0,'column on non-array returns []');
		
		//test wrapper inspect
		t.equal(HTML('html').inspect(),'[Wrapper html]','inspect html');
		t.equal(ds.Wrapper(5).inspect(),5,'inspect number');
		t.equal(ds.Wrapper(new Number(5)).getType(),'number','type of number object');
		t.equal(Collection(x).inspect(),'[Wrapper collection]','inspect collection');
		t.equal(ds.Wrapper({a:'I am an object'}).inspect(),'[Wrapper object]','inspect object');
		t.equal(Collection(x).filterEqual('field 1','a').count().data(),3,'filterEqual');
		t.equal(Collection(x).filterEqual('field 1',['a','b']).count().data(),7,
						'filterEqual - value is an array');
		t.equal(Collection(x).filter((data)=>data['field 1']==='a').count().data(),3,'filter using a function');
		
		t.equal(Collection(x).column((data)=>data['field 2']*2).sum().data(),118,'function as column');
		Collection(Promise.resolve(Collection([1,2,3]))).sum().do((d)=>t.equal(d.valueOf(),6,'Execute a function on a promise that resolves to a wrapper'));
		t.equal(Collection([{a:1},4,{b:2}]).fields().data().join(),'a,b','fields functions with elements that are not objects');
		
		Collection(x).addField('additional',[1,2,3,4,5,6,7,8,9,10])
			.do((data)=>t.equal(data[9].additional,10,'addField by array'));
		Collection(x).addField('additional',(input)=>input.id*2)
			.do((data)=>t.equal(data[9].additional,20,'addField by function'));
		Collection(x).addField('additional',613)
			.do((data)=>t.equal(data[4].additional,613,'addField when value is not function or array'));
		
		t.equal(Collection(x).dropEqual('field 2',1).count().data(),8,'dropEqual single value');
		t.equal(Collection(x).dropEqual('field 2',[1,2]).count().data(),7,'dropEqual several values');
		
		Collection(x).groupBy('field 1',{
			count:(data)=>data.length,
			count2:(data)=>Collection(data).count()
		})
		.do((data)=>{
			t.equal(data.length,4,'groupBy - count number of groups created');
			t.equal(data[0].count,3,'groupBy - group function count');
			t.equal(data[0].count2,3,'groupby - group function count2 when returning a wrapper');
			
			//add
			t.equal(Collection([1,2]).add(3).count().data(),3,'add element');
			t.equal(Collection([1,2]).add([3,4]).count().data(),4,'add array of elements');
			t.equal(Collection({a:'element'}).add({a:'second'}).count().data(),2,'add element to non-array');
			
			//get
			t.equal(Collection(x).get(2,'id').id,2,'get with explicit key');
			t.equal(Collection(x).context('key','id').get(3).id,3,'get with context defined key');
		});
		
	});
});

