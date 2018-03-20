const process = require('process');

module.exports = {
	guessEnv:guessEnv,
	getFieldFunction : function (field){
		if(typeof field === 'function'){
			return field;
		}else if(field === undefined || field === 'this'){
			return function(data){return data;};
		}else{
			return function(data){return data[field];};
		}
	}
};

/**
 * guess the execution environment. Could be one of the following:
 * <li>node
 * <li>ijavascript
 * <li>tap
 * <li>notablemind - jupyter-nodejs kernel from https://github.com/notablemind/jupyter-nodejs
 * <li>runkit
 */
function guessEnv(){
	if(typeof $$ === 'object' && typeof $$.sendResult === 'function'){
		return 'ijavascript';
	}
	if(process.env['TAP'] === '1'){
		return 'tap';
	}
	if(typeof display === 'function'){
		return 'notablemind';
	}
	return 'node';
}