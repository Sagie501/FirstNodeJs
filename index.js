var http = require('http');
var static = require('node-static');

const PORT = 8000;

var file = new static.Server('./public/');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response, function (e, res) {
            if (e && (e.status === 404)) {
                file.serve('chat.html', 404, {}, request, response);
            }
        });
    }).resume();
}).listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
});

/*const PORT = 8000;

function handleRequest(request, respone) {
    respone.end("jhkhj");
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
   console.log("Server listening on: http://localhost:%s", PORT);
});*/