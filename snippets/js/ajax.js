// xhr
function ajaxReq(method, url, options, callback) {
    var xhr = new xhrRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log('responseText:' + xhr.responseText);
            try {
                var data = JSON.parse(xhr.responseText);
            } catch(err) {
                console.log(err.message + " in " + xhr.responseText);
                return;
            }
            callback(data);
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader("data", JSON.stringify(options));
    xhr.send();
}

// Use a Promise to wait until Ajax request has finished
new Promise(function(resolve, reject) {
    ajaxReq('GET', constUrl, options, function(data) {
        resolve(data);
    });
}).then(function(response) {
    console.log(response);
});


// jquery
$.ajax({
    url: "/server-url",
    type: 'GET',
    success: function (data) {
        console.log("success");
        console.log(data);
    }
});




// request.js
// base API requester function
function requester(options, callback) {
    request(options, function(error, response, body) {
        // console.log(response.headers, body);
        callback(body);
    });
}
// API Request Function
function callApi(data, callback) {
    var options = {
        method: 'POST',
        url: baseUrl,
        // rejectUnauthorized: false,
        body: data,
        // headers: {
        //     'Cache-Control': 'no-cache',
        //     'Content-Type': 'application/json',
        // },
        json: true
    };

    requester(options, function(result, err) {
        if (err) {
            console.log(err);
            return;
        }
        callback(result);
    });
}
