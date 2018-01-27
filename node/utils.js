var Boilerpipe = require('boilerpipe');
var GOOGLE_APPLICATION_CREDENTIALS = "./Secret_Credential.json"
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();
						
function getContent(url, callback) {  
	var boilerpipe = new Boilerpipe({
    	extractor: Boilerpipe.Extractor.Article,
    	url: url
  	});
	boilerpipe.getText(
		function(err, text){
			boilerpipe.getImages(
		function(error2, images){
			if(!error2){
				for(var i = 0; i < images.length; i++){
			   		client
                       .labelDetection(images[i].src)
                       .then(results => {
                       const labels = results[0].labelAnnotations;

                       //console.log(typeof labels[0].description);
                       var labels_being_added = " ";
                       for(var label = 0; label < labels.length; label++){
                       	  labels_being_added =  labels_being_added + " " + (labels[label].description);


                       }
                       if(!err){

							callback(text + labels_being_added);
						}else{
							callback(labels_being_added);
							console.error("TEXT error");
						}
                      // labels.forEach(label => console.log(label.description));
            })
                     .catch(err => {
                      console.error('ERROR:', err);
                      });	
			     }
			}else{
				if (!err) {
					callback(text);
					console.error("Imageerror");
				}else{
				    console.error("BOTH ERROR");	
				}
				console.log("NO IMAGES/ ERROR LOADING IMAGES")
			}
		}
	);
			
		}
	);

	
}



// Performs label detection on the image file


function parseResult(returnList) {
   var res = [];
   var temp = returnList['hits']['hits'];
   var len = temp.length > 5 ? 5 : temp.length;
   for(var i = 0; i < len; i++) {
       res.push(temp[i]['_source']['url']);
   }
   return res;
}

module.exports = {parseResult, getContent}
