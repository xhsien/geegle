var util = require("util");
var spawn = require("child_process").spawn;
	

function getClosestWord(word, callback) {
	// return new Promise((resolve, reject) => {
		var program = spawn('python',["word2vec.py", word]);
		// util.log('readingin')

		// program.stdout.pipe(process.stdout);
		// program.on('exit', function() {
		// 	process.exit()
		// })
		program.stdout.on('data',function(chunk){

	    	var textChunk = chunk.toString('utf8');// buffer to string
	 //    	// resolve(textChunk);
	    	callback(textChunk);
	 		// callback(textChunk);
	   	});
	 	// program.stdout.on('data', resolve, reject);
	 	// resolve('next');
	// });

}
// console.log("NEW1");
// getClosestWord(process.argv[2]);
// getClosestWord(process.argv[2]).then((e) => {console.log(e.toString('utf8'));});
module.exports = {getClosestWord};
