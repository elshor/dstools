module.exports = function(func){
	func.call(this,this);
	return this;
};
