var fs = require('fs');
const express = require('express');
var utils = require('./utils.js');
var es = require('./elastic_search.js');
const app = express();
var https = require('https');
var word2vec = require('./caller.js');
var async = require('async');
var spawn = require("child_process").spawn;


const port = 3000;

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(port);

// function getList(members, callback) {
//   async.map(members, function(member, callback) {
//     word2vec.getClosestWord(member.trim(), function(closest_word) {
//       callback(null, closest_word);
//     });
//   }, callback);
// }

var search_term_global;

function removeQuote(str) {
    return str.replace(new RegExp("'", 'g'), '');
}
function fromTextToArray(str) {
    var res = str.substr(1, str.length - 3);
    res = res.split(",");
    return res;
}

function augment(search_term) {
    var splitted_search_term = search_term.split(" ");
    search_term_global = search_term + " " + search_term + " " + search_term;
    // // getList(splitted_search_term, function(e) {
    // //   console.log("SEARCH TERM");
    // //   console.log(e);
    // //   callback(e);
    // // })
    // var old_i;
    // var j = 0;
    for(var i = 0; i < splitted_search_term.length; i++) {
        // if(old_i == i) continue;
        console.log("Spplitt " + splitted_search_term[i].trim());
        word2vec.getClosestWord(splitted_search_term[i].trim(), function(closest_word) {
          console.log("CLOSEST " + closest_word);
          closest_word = fromTextToArray(closest_word);
          search_term_global += " " + removeQuote(closest_word[0]) + " " + removeQuote(closest_word[1]) +
                                 " " + removeQuote(closest_word[2]);
          console.log("MSUT BE HERE " + search_term_global);
          // setTimeOut(function() {old_i = i; i++;}, 10000);
            // console.log("HERE");
          // j++;
          // if (j == splitted_search_term.length) {
          //   search_term_global = search_term;
          // }
        });
        // var temp = await word2vec.getClosestWord(splitted_search_term[i]);
        // search_term += " " + temp.toString('utf8');
        // console.log("HERE");
        // console.log(search_term);
        // resolve(search_term);
        // console.log("HOHO");
        // console.log(splitted_search_term[i]);
        // var program = spawn('python',["../python/word2vec.py", splitted_search_term[i]]);
        // program.stdout.pipe(process.stdout);
    }
    // setTimeout(function() {}, 100000);
    // callback(search_term);
}

app.get('/uploadContent', (req, res) => {
    es.post(req.query.uploadTime, req.query.url, req.query.id, function(confirmRes) { res.send(confirmRes); });
})

app.get('/query', (req, res) => {
    setTimeout(function() {
        search_term_global = "";
        setTimeout(function() {
            console.log("QUERY: " + search_term_global);
            es.retrieve(search_term_global,  req.query.fromTime, function(returnList) {
               var list_urls = utils.parseResult(returnList); 
               res.send(list_urls);
            });

        }, 2000);
        augment(req.query.keywords);
    }, 0);


   //  augment(req.query.keywords).then((augmented_search_term) =>  {
   //    console.log("AUGMENTED " + augmented_search_term);
      // es.retrieve(augmented_search_term,  req.query.fromTime, function(returnList) {
  			 //   var list_urls = utils.parseResult(returnList); 
  			 //   res.send(list_urls);
      // });
   // });
})

// app.listen(port, (err) => {
//     if(err) {
//        console.log("ERROR: " + err);
//     } else {
//        console.log("Server listening");
//    }
// })
