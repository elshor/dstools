const t = require('tap');
const fs = require('fs');
const ds = require('..');
const Collection = ds.Collection;
const HTML = ds.HTML;

t.test('text functions',(t)=>{
	t.plan(3);
	HTML('this is html').save('temp.html').do(()=>{
		let text = fs.readFileSync('temp.html').toString();
		t.equals(text,'this is html','save html file');
	});
	Collection('this is plain text').save('temp.txt').do(()=>{
		let text = fs.readFileSync('temp.txt').toString();
		t.equals(text,'this is plain text','save plain text');
	});
	Collection([1,2,3]).save('temp.json').do(()=>{
		Collection()
		.load('temp.json')
		.do((data)=>t.equals(data[1],2,'save and load json file'));
	});
});
