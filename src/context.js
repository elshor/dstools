const Wrapper = require('..').Wrapper;
const NOWRAP = require('..').NOWRAP;

/**
 * Set the context of the wrapped collection. The context is a name-value object that is passed on through-out the function chain. It can be used to set a context value that can be reused by subsequent function calls. E.g. it can be used to set username and password that can later be used by any functions that access a restricted API.
 * <p>
 * The context function can have four forms:<ol>
 * <li>context(contextObject) - contextObject is a context object with property names and property values and context names and values
 * <li>context(name,value) - set the context name to value. This function may override existing context value
 * <li>context(name) - return the value of the context name
 * <li>context() - return the context object
 * </ol>
 * @alias context
 */
module.exports = function(wrapped, context,contextValue){
	let newContext = {};
	if(context === undefined){
		//just return the context
		return NOWRAP(this.getContext());
	}else if(typeof context === 'object'){
		//copying values of context object to the context
		newContext = Object.assign({},this.getContext(),context);
		return new Wrapper(wrapped,this._type,{context:newContext});
	}else if(typeof contextValue !== undefined){
		newContext[context] = contextValue;
		newContext = Object.assign({},this.getContext(),newContext);
		return new Wrapper(wrapped,this._type,{context:newContext});
	}else if(typeof context === 'string' && contextValue === undefined){
		//return the context value
		return NOWRAP(this.getContext(context));
	}else{
		throw new Error('context function was called with wrong arguments');
	}
};