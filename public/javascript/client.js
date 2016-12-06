window.onload = function () {
  var connection = new WebSocket('ws://10.103.50.249:8000');

  var name = document.querySelector("#username");
  var text = document.querySelector("#message");
  var posts = document.getElementById("posts");

  document.querySelector("#send").addEventListener("click", sendMessage);

  connection.onmessage = function (message) {
      try {
          var jsonMessage = JSON.parse(message.data);
          var documentFragment = document.createDocumentFragment();

          var messageObject = document.createElement("p");
          messageObject.innerHTML = jsonMessage.data;
          documentFragment.appendChild(messageObject);

          posts.appendChild(documentFragment);
      } catch (e) {
          console.log("Error: invalid json: ", message.data);
          return;
      }
  };

    function sendMessage() {
        if (validMessage()) {
            connection.send(name.value + " : " + text.value);
            document.getElementById("message").value = "";
        }
    }
};

var validMessage = function () {
    return document.getElementById("message").value != "";
};