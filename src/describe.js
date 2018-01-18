const Collection = require('..').Collection;
const jStat = require('jstat').jStat;

/**
 * Calculate basic distribution measures of a field in a data collection. the measures include count, mean, standard deviation, min value, max value and quartiles. Each measure is a separate object with properties  measure (name of measure) and value (value of the measure).
 * @alias describe
 * @param   {string}     data field name
 * @returns {Collection} Collection of distribution measures
 */
module.exports = function(data, field){
	console.assert(typeof field === 'string','Describe must specify a field name');
	let vec = Collection(data).column(field).data();
	console.assert(Array.isArray(vec),'Describe function was called on an object that is not an array');
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
