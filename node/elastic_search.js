var es = require('elasticsearch');
var utils = require('./utils.js');
var client = new es.Client({
    host: 'localhost:9200',
    log: 'trace'
});

function post(date, url, id, callback) {
   content = utils.getContent(url);
   client.create({
	index: 'myindex',
        type: 'mytype',
        id: id,
        body: {
           content: content,
           date: date,
           url: url
        }
   }, function(err, res) {
 	if(err) {
	  console.log(err);
       	} else {
           console.log(res);
           callback(res);
       	}  
   });
}

function retrieve(keywords, callback) {
   client.search({
 	index: 'myindex', 
	type: 'mytype',
        body: {
	    query: {
		match: {
		    content: keywords
		}
	    }
	}
   }, function(err, res) {
   	if(!err) {
           callback(res);
	}
   });

}

module.exports = {post, retrieve};
