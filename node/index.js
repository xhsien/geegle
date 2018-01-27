const express = require('express');
var utils = require('./utils.js');
var es = require('./elastic_search.js');
const app = express();
const port = 3000;

app.get('/uploadContent', (req, res) => {
    es.post('aaa', 'bbb', 'ccc', '2', function(confirmRes) { console.log(confirmRes); });
    res.send('Hello from Express');
})

app.get('/query', (req, res) => {
   es.retrieve('aaa',  function(returnList) {
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
