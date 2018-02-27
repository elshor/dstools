const t = require('tap');
const ds = require('..');
const Collection = ds.Collection;

t.test('test context',(t)=>{
	t.plan(7);
	Collection([{a:1},{a:2}])
	.do((data,thisObject)=>t.equals(thisObject.getContext('a'),undefined,'start with empty context'))
	.context('a',1)
	.do(function(data){
		t.equals(this.getContext('a'),1,'updated context');
	})
	.context({b:2,c:3})
	.do(function(data){
		t.equals(this.getContext('a'),1,'after update context again with object. Should not change current context');
		t.equals(this.getContext('b'),2,'after update context again with object - new context');
		t.equals(this.getContext().a,1,'getContext object instead of value');
	})
	.save('temp1.json')
	.do(function(data){
		t.equals(this.getContext('a'),1,'after save');
	})
	.map((d)=>d*3)
	.do(function(data){
		t.equals(this.getContext('a'),1,'after map');
	})
	;
});
