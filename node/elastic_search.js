var es = require('elasticsearch');
var utils = require('./utils.js');
var client = new es.Client({
    host: 'localhost:9200',
    log: 'trace'
});

function post(date, url, id, title, callback) {
  console.log("util" + utils);
  utils.getContent(url, function(content) {
     client.create({
  	 index: 'myindex',
          type: 'mytype',
          id: id,
          body: {
             content: content,
             uploadTime: date,
             url: url,
             title: title
          }


     }, function(err, res) {
   	      if(err) {
  	         console.log(err);
         	} else {
             console.log(res);
             callback(res);
         	}  
     });
     
  });
}

function retrieve(keywords, fromTime, callback) {
   client.search({
 	    index: 'myindex', 
	    type: 'mytype',
      body: {
  	    query: {
  		    match: {
  		      content: keywords
  		    }
  	      // filter: {
         //    uploadTime: {"gte": fromTime}
  	      // }
  	    }
      }
    }, function(err, res) {
   	    if(!err) {
          callback(res);
	      }
   });

}

module.exports = {post, retrieve};
