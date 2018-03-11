const t = require('tap');
const ds = require('..');
const Collection = ds.Collection;

t.test('test catch',(t)=>{
	t.plan(2);
	Collection(Promise.reject({message:'exception'})).catch((e)=>t.ok(e,'Caught single exception'));
	Collection(Promise.resolve([1,2,3]))
	.forEach((item)=>{
		if(item===2)return Promise.reject("Can't be 2");
	}).catch((e)=>console.log('got',e)||t.ok(e,'Caught exception in group'));
});
