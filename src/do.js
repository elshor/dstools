/**
 * Run a function receiving the collection data as its first argument. This is useful when chaining several functions and there is a need for customized operation in the midst of the chain.
 * @alias do
 * @param   {function} func The function to execute in the form of func(data,thisObject)
 * @returns {Object}   The input wrapped data
 */
module.exports = function(data, func){
	func.call(this,data,this);
	return data;
};
