var http = require('http');
var static = require('node-static');
var webSocket = require('websocket').server;

var fileServer = new static.Server('./public/');
var connections = [];

const PORT = 8000;

var server = http.createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (e, res) {
            if (e && (e.status === 404)) {
                fileServer.serveFile('html/chat.html', 200, {}, request, response);
            }
        });
    }).resume();
}).listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
});

wsServer = new webSocket({
   httpServer: server
});

wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connections.push(connection);

    connection.on('message', function(message) {
        console.log('Received Message: ' + message.utf8Data);
        var name = message.utf8Data.split(" ")[0];
        var text = message.utf8Data.split(" ")[1];
        for (currConnection of connections) {
            currConnection.sendUTF(JSON.stringify({name: name, text: text}));
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});