// npm i sse

const SSE = require('SSE');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
});
 
server.listen(8080, '127.0.0.1', function() {
  var sse = new SSE(server);
  sse.on('connection', function(client) {
    client.send('hi there!');
  });
});

//// Client-side Listener:
// var es = new EventSource("/sse");
// es.onmessage = function (event) {
//   console.log(event.data);
// };
