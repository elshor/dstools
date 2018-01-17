module.exports = function(vec,options={}){
	return vec.join(options.sep || '\n');
};