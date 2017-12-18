const Collection = require('./collection');
const jStat = require('jstat').jStat;

module.exports = function(field){
	let vec = Collection(this).column(field).data();
	if(!Array.isArray(vec)){
		return [];
	}
	let quartiles = jStat.quartiles(vec);
	return [
		{measure:'column',value:field},
		{measure:'count',value:vec.length},
		{measure:'mean',value:jStat.mean(vec)},
		{measure:'std',value:jStat.stdev(vec)},
		{measure:'min',value:jStat.min(vec)},
		{measure:'25%',value:quartiles[0]},
		{measure:'50%',value:quartiles[1]},
		{measure:'75%',value:quartiles[2]},
		{measure:'max',value:jStat.max(vec)}
	];
};
