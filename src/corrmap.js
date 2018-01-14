const plotly = require('./plotly');
const Collection = require('..').Collection;
const jStat = require('jstat');

module.exports = function(data, layout={}){
	data = Collection(data);
	let fields=[], fields1 = data.fields().data();
	let vectors=[], vectors1 = fields1.map((field)=>data.column(field).data());

	//remove fields that have textual values
	for(let f = 0;f<fields1.length;++f){
		if(!hasNonNumericalValues(vectors1[f])){
			fields.push(fields1[f]);
			vectors.push(vectors1[f]);
		}
	}
	let mtx = [];
	for(let i=0;i<fields.length;++i){
		let arr = [];
		for(let j=0;j<fields.length;++j){
			arr.push(jStat.corrcoeff(vectors[i],vectors[j]));
		}
		mtx.push(arr);
	}
	return plotly.call(
		this,
		data,
		[{
			z: mtx,
			x: fields,
			y: fields,
			type: 'heatmap'
		}],
		Object.assign({title:'Correlation Map'},layout)
	);
};

function hasNonNumericalValues(arr){
	for(let i = 0;i < arr.length;++i){
		if(typeof arr[i] !== 'number' && arr[i] !== null && arr[i] !== undefined){
			return true;
		}
	}
	return false;
}
