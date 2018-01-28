// const https = require("https");
var xhr = new XMLHttpRequest();

function formatParams(params) {
    return "?" + Object.keys(params).map(function(key) {
        return key+"="+encodeURIComponent(params[key]);
    }).join("&");
}

function fromTextToArray(str) {
    var res = str.substr(1, str.length - 2);
    res = res.split(",");
    return res;
}

function removeQuote(str) {
    return str.replace(new RegExp('"', 'g'), '');
}


function to_second(day) {
    return day * 24 * 60 * 60;
}


$('#submit-button').click(function() {
    $("#result").html("");
    
    var duration_text = $('#duration').find("option:selected").text();
    
    var duration;
    if (duration_text == "from 1 week ago") {
        duration = to_second(7);
    } else if (duration_text == "from 1 day ago") {
        duration = to_second(1);
    } else {
        duration = -1;
    }

    var now = Math.round((new Date()).getTime() / 1000);
    var start = (duration == -1 ? 1514764800 : now - duration);
    
    var search_term = $('#search-term').val();
   
    // alert(start + "\n" + now + "\n" + search_term);
    var params = {
        fromTime: start,
        keywords: search_term
    }

    //alert(formatParams(params));
    xhr.open('GET', 'https://localhost:3000/query' + formatParams(params));
    xhr.onreadystatechange = function() {
        if(xhr.readyState > 3 && xhr.status==200) { 
            var results = JSON.parse(xhr.responseText);
            // alert(results.suggested_words);
            // $("#do-you-mean").innerHTML = "Do you mean: " + results.suggested_words;

            //alert(xhr.responseText);
            
            //console.log(results);
            //alert(results);
            //results.titles = results.urls;
            $("#result").append('<ul class="list-group list-group-flush"></ul>');
            for (var i = 0; i < results.urls.length; i++) {
                //alert(results.titles);
                var p = document.createElement("p");

                if (results.titles[i] == null) {
                    results.titles[i] = results.urls[i];
                }

                p.innerHTML = (results.titles[i].length > 50 ? results.titles[i].substring(0, 50) + "..." : results.titles[i]);
                //alert(p);
                var a = document.createElement("a");
                a.setAttribute('href', results.urls[i]);
                a.setAttribute('title', results.titles[i]);
                a.setAttribute('target', '_blank');
                a.innerHTML = (results.urls[i].length > 70 ? results.urls[i].substring(0, 69) + "..." : results.urls[i]);

                var li = document.createElement("li");
                li.setAttribute('class', "list-group-item");
                li.append(p);
                li.append(a);
                $("ul").append(li);
            }          
        }
    }
    xhr.send();

            // var results = [["https://github.com/chrisboo/geegle", "geegle"], 
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"],
            //                ["https://stackoverflow.com/questions/35804081/can-google-vision-api-accept-external-image-url", "Can google cloud vision API accept external image URL? - Stack Overflow"]];
})
