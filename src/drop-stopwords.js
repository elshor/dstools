const sw = require('stopwords').english;
const Collection = require('..').Collection;

/**
 * Drop stopwords from a collection. If the field is specified, The collection of stopwords is compared to the field value. Otherwise, The collection is treated as a collection of strings, not objects.
 * @alias dropStopwords
 * @param   {string|number|function} field='this' the field spec - as in the column function
 *                                                @returns {Collection}             The collection of data objects excluding the stopwords
 */
module.exports = function(terms,field='this'){
	if(field === 'this'){
		return Collection(terms).dropEqual((data)=>data.toString().toLowerCase(),sw);
	}else{
		return Collection(terms).dropEqual((data)=>data[field].toString().toLowerCase(),sw);
	}
};
