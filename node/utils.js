var Boilerpipe = require('boilerpipe');
					
function getContent(url, callback) {  
	var boilerpipe = new Boilerpipe({
    	extractor: Boilerpipe.Extractor.Article,
    	url: url
  	});
	boilerpipe.getText(
		function(err, text){
			if(!err){
				callback(text);
			}else{
				console.log('Error');
			}
		}
	);

	boilerpipe.getImages(
		function(err, images){
			if(!err){
				console.log(images);
			}else{
				console.log("NO IMAGES/ ERROR LOADING IMAGES")
			}
		}
	);
}

function parseResult(returnList) {
   var res = [];
   var temp = returnList['hits']['hits'];
   var len = temp.length > 5 ? 5 : temp.length;
   for(var i = 0; i < len; i++) {
       res.push([temp[i]['_source']['url'], temp[i]['_source']['title']]);
   }
   return res;
}

module.exports = {parseResult, getContent}
