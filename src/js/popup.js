var xhr = new XMLHttpRequest();

function formatParams(params) {
    return "?" + Object.keys(params).map(function(key) {
        return key+"="+encodeURIComponent(params[key]);
    }).join("&");
}

function to_second(day) {
    return day * 24 * 60 * 60;
}

$('#submit-button').click(function() {
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
    // alert(formatParams(params));
    xhr.open('GET', 'http://localhost:3000/query' + formatParams(params));
    xhr.onreadystatechange = function() {
        if(xhr.readyState > 3 && xhr.status==200) 
           console.log("QueryResult: " + xhr.responseText);
    }
    xhr.send();
})
