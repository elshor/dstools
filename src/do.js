module.exports = function(func){
	return func.call(this,this);
};
