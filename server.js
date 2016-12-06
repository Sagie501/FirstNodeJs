var http = require('http');
var static = require('node-static');

var fileServer = new static.Server('./public/');

const PORT = 8000;

http.createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (e, res) {
            if (e && (e.status === 404)) {
                fileServer.serveFile('html/chat.html', 404, {}, request, response);
            }
        });
    }).resume();
}).listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
});