var xhr = new XMLHttpRequest();

function formatParams(params) {
	return "?" + Object.keys(params).map(function(key) {
		return key+"="+encodeURIComponent(params[key]);
	}).join("&");
}

var url = window.location.href;
var timestamp = Math.round((new Date()).getTime() / 1000);

var params = {
	url: url,
	uploadTime: timestamp,
	id: timestamp
}

alert("ABOUT TO DO");
xhr.open('GET', 'http://localhost:3000/uploadContent' + formatParams(params));
xhr.onreadystatechange = function() {
    if(xhr.readyState > 3 && xhr.status==200) alert("Uploaded: " + xhr.responseText);
}
xhr.send();
