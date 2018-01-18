const t = require('tap');
const ds = require('..');
const Collection = ds.Collection;

const input = [{text:'How are you today.'},{text:'Today you are important'}]; 
t.test('text functions',(t)=>{
	Collection(input)
	.terms({field:'text'})
	.do((data)=>{
		t.equals(data.length,6,'simple extract terms');
	})
	.dropStopwords('term')
	.do((data)=>t.equals(data.length,3,'drop stopwords'))
	;
	t.equals(Collection(['he','xyz']).dropStopwords().data().length,1,'dropStopwords - input is array of string');
	t.equals(Collection('Upper').toLowerCase().data(),'upper','toLowerCase - input is string');
	t.equals(Collection(['Upper','Case']).toLowerCase().data()[1],'case','toLowerCase - input is an array');
	t.equals(Collection(['Upper',4]).toLowerCase().data()[1],4,'toLowerCase - input is not a string - just pass the input object - do nothing');
	t.equals(Collection(['a','b']).merge().data(),'a\nb','simple merge using default sep');
	t.equals(Collection(['a','b']).merge({sep:'-'}).data(),'a-b','merge using sep');
	t.end();
});
