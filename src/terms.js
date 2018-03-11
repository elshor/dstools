const ALL='\x01';
const getFieldFunction = require('./utils').getFieldFunction;
const re=`https?\\:\\/\\/\\S+|[0-9]*\\.[0-9]+|[0-9]+|(\\p{L}|[0-9])+`;
const TOKEN_REGEX = require("xregexp")(re,'g');
const defaultOptions = {
	field: 'this',
	groupBy:null,
	calc:'count'
};

/**
 * Extract terms from a collection text field. The output is a collection of terms, the term label is stored in the property term. If a groupBy property is specified in options then the function generates a term for each unique value in the groupBy field. The groupBy field value is stored in the groupBy field. This function generates measures of the terms. By default the only measure generated in count of terms. The options calc field may contain a comma separated list of mesures to calculate. Possible measures are:
 * <li>count
 * <li>prob
 * <li>groupProb
 * <li>tfidf
 * <li>idf
 * <li>entropy
 * @alias terms
 * @param   {string|number|function} options.field Field of text property to extract terms from. Default is 'this' assuming the data objects are strings
 * @returns {Collection}             Collection of terms with the term label in property term
 */
module.exports = function(text,options){
	//normalize options
	options = Object.assign({},defaultOptions,options);
	options.calc = options.calc.split(',').map((func)=>func.trim());
	const output = [];
	const counts = {};
	counts[ALL]={};
	counts[ALL][ALL]=0;
	const fieldFunction = getFieldFunction(options.field);
	const groupField = options.groupBy? 
				getFieldFunction(options.groupBy) : function(){return undefined;} ;

	if(typeof text === 'string'){
		updateCounts(text,undefined,counts);
	}else{
		//text is a collection
		text.forEach((row)=>updateCounts(fieldFunction(row), groupField(row),counts));
	}
	//generate rows
	let nGroups = (Object.keys(counts).length-1);
	let idfs = {},entropy={};
	if(options.calc.includes('tfidf')||options.calc.includes('idf')){
		Object.keys(counts[ALL]).forEach((term)=>{
			let docsWithTerm = -1;//ignore ALL group
			Object.keys(counts).forEach(group=>{
				if(counts[group][term]){
					docsWithTerm++;
				}
			});
			idfs[term] = 1 + Math.log(nGroups/ (1+ docsWithTerm));
		});
	}
	if(options.calc.includes('entropy')){
		Object.keys(counts[ALL]).forEach((term)=>{
			let termEntropy = 0;//ignore ALL group
			Object.keys(counts).forEach(group=>{
				let p = counts[group][term]/counts[ALL][term];
				termEntropy += p * Math.log(p);
			});
			entropy[term] = -termEntropy;
		});
	}
	
	Object.keys(counts).forEach((group)=>{
		if(group === ALL && Object.keys(counts).length !== 1){
			//there are groups. skip this
			return;
		}
		Object.keys(counts[group]).forEach((token)=>{
			if(token === ALL){
				return;
			}
			let row = {term:token};
			if(group !== ALL){
				row[typeof options.groupBy === 'string'?options.groupBy:'group'] = group;
			}
			if(options.calc.includes('count')){
				//count(group,token)
				row.count = counts[group][token];
			}
			if(options.calc.includes('prob')){
				//p(token|group)
				row.prob = counts[group][token]/counts[group][ALL];
			}
			if(options.calc.includes('groupProb')){
				//p(group|token)
				row.groupProb = counts[group][token]/counts[ALL][token];
			}
			if(options.calc.includes('tfidf')){
				let tf = counts[group][token]/counts[group][ALL];//term frequency
				let idf = idfs[token];
				row.tfidf = tf*idf;
			}
			if(options.calc.includes('idf')){
				row.idf = idfs[token];
			}
			if(options.calc.includes('entropy')){
				row.entropy = entropy[token];
			}
			output.push(row);
		});
	});
	return output;
};

function updateCounts(text,groupBy,counts){
	let tokens = text.match(TOKEN_REGEX);
	tokens = tokens || [];//handle situations where text is an empty string
	//update counts
	tokens.forEach((token)=>{
		if(!counts[ALL][token]){
				counts[ALL][token] = 1;
		}else{
			counts[ALL][token]++;
		}
		counts[ALL][ALL]++;//general counter
		if(groupBy){
			if(!counts[groupBy]){
				counts[groupBy] = {};
				counts[groupBy][ALL] = 0;
			}
			counts[groupBy][ALL]++;//increment group counter
			if(!counts[groupBy][token]){
				counts[groupBy][token] = 1;
			}else{
				counts[groupBy][token]++;
			}
		}
	});
}
