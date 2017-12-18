const Collection = require('./collection');

module.exports = function(){
	let ret = '<table><tr>';
	let columns = Collection(this).columns().data;
	for(let i=0;i<columns.length;++i){
		ret += `<th>${columns[i]}</th>`;
	}
	ret += '</tr>';
	this.forEach((row)=>{
		ret += '<tr>';
		for(let j=0;j<columns.length;++j){
			ret += `<td>${row[columns[j]]}</td>`;
		}
		ret += '</tr>';
	});
	ret += '</table>';
	return ret;
};
