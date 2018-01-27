const express = require('express');
var utils = require('./utils.js');
var es = require('./elastic_search.js');
const app = express();
const port = 3000;

app.get('/uploadContent', (req, res) => {
    es.post(req.query.uploadTime, req.query.url, req.query.id, function(confirmRes) { res.send(confirmRes); });
})

app.get('/query', (req, res) => {
   es.retrieve(req.query.keywords,  req.query.fromTime, function(returnList) {
			     var list_urls = utils.parseResult(returnList); 
			     res.send(list_urls);
         });
})

app.listen(port, (err) => {
    if(err) {
       console.log("ERROR: " + err);
    } else {
       console.log("Server listening");
   }
})
