const process = require('process');
const guessEnv = require('./utils').guessEnv;
const EMPTY_LINE = '                                                                               ';
const MAX_LEN = EMPTY_LINE.length;

module.exports = function(){
	let id = '' + new Date().getTime() + Math.random();
	let $ = null;
	let reporter=null;
	if(guessEnv() === 'ijavascript'){
		$$.async();
		$ = $$;
		reporter = $$.display(id);
	}

	return function(message){
		if(guessEnv() === 'tap'){
			//no output with tap environment
			return;
		}
		if(message === undefined){
			//this is the end message - report done
			if(reporter){
				$.done();
			}else{
				process.stdout.write('\n');
			}
		}else{
			if(reporter){
				reporter.html(message);
			}else{
				process.stdout.write('\r'+EMPTY_LINE+'\r');
				process.stdout.write(message.substr(0,MAX_LEN));
			}
		}
	};
};
