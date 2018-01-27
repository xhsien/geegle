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
            //alert(xhr.responseText);
            var results = fromTextToArray(xhr.responseText);

            $("#result").append('<ul class="list-group list-group-flush"></ul>');
            for (var i = 0; i < results.length; i++) {
                var a = document.createElement("a");
                a.setAttribute('href', results[i][0]);
                a.setAttribute('title', results[i][1]);
                a.setAttribute('target', '_blank');
                a.innerHTML = (results[i][0].length > 70 ? results[i][0].substring(0, 69) + "..." : results[i][0]);

                var li = document.createElement("li");
                li.setAttribute('class', "list-group-item");
                li.append(a)
                $("ul").append(li);
            }           
        }
    }
    xhr.send();
})
