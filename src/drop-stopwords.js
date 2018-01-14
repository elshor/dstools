const sw = require('natural').stopwords;
const Collection = require('..').Collection;
module.exports = function(terms,field='this'){
	if(field === 'this'){
		return Collection(terms).dropEqual((data)=>data.toString().toLowerCase(),sw);
	}else{
		return Collection(terms).dropEqual((data)=>data[field].toString().toLowerCase(),sw);
	}
};
