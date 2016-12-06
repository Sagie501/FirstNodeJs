var http = require('http');
var static = require('node-static');


var file = new static.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(8000);

/*const PORT = 8000;

function handleRequest(request, respone) {
    respone.end("jhkhj");
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
   console.log("Server listening on: http://localhost:%s", PORT);
});*/