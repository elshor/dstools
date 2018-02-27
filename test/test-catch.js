const t = require('tap');
const ds = require('..');
const Collection = ds.Collection;

t.test('test catch',(t)=>{
	t.plan(1);
	Collection(Promise.resolve([1,2,3]))
	.forEach((item)=>{if(item===2)throw new Error("Can't be 2");})
	.catch((e)=>console.log('got',e));
});
