function formatParams(params) {
	return "?" + Object.keys(params).map(function(key) {
		return key+"="+encodeURIComponent(params[key]);
	}).join("&");
}

var url = window.location.href;
var timestamp = Math.round((new Date()).getTime() / 1000);

var params = {
	url: url,
	uploadTime: timeStamp,
	id: timeStamp
}

xhr.open('GET', 'http://localhost:3000/uploadContent' + formatParams(params));
xhr.onreadystatechange = function() {
    if(xhr.readyState > 3 && xhr.status==200) alert("Uploaded: " + xhr.responseText);
}
xhr.send();