function getContent(url) {
}

function parseResult(returnList) {
   var res = [];
   var temp = returnList['hits']['hits'];
   var len = temp.length > 5 ? 5 : temp.length;
   for(var i = 0; i < len; i++) {
       res.push(temp[i]['_source']['url']);
   }
   return res;
}
