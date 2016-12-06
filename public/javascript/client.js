window.onload = function () {
  var connection = new WebSocket('ws://10.103.50.249:8000');

  var name = document.getElementById("username");
  var text = document.getElementById("message");
  var posts = document.getElementById("posts");

  document.getElementById("send").addEventListener("click", sendMessage);

    document.getElementById("message").addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            sendMessage();
        }
    });

    document.getElementById("username").addEventListener("blur", function () {
        if (document.getElementById("username").value == "") {
            document.getElementById("message").disabled = true;
            document.getElementById("message").setAttribute("placeholder", "Enter name first");
            document.getElementById("message").value = "";
        } else {
            document.getElementById("message").disabled = false;
            document.getElementById("message").setAttribute("placeholder", "Enter your message");
        }
    });

  connection.onmessage = function (message) {
      try {
          var jsonMessage = JSON.parse(message.data);
          var documentFragment = document.createDocumentFragment();
          var rowDiv = document.createElement("div");
          rowDiv.classList.add("row");
          var userNameP = document.createElement("span");
          userNameP.classList.add("username");
          var messageP = document.createElement("span");

          userNameP.innerHTML = jsonMessage.name + " ";
          messageP.innerHTML = jsonMessage.text;

          rowDiv.appendChild(userNameP);
          rowDiv.appendChild(messageP);

          documentFragment.appendChild(rowDiv);

          posts.appendChild(documentFragment);
      } catch (e) {
          console.log("Error: invalid json: ", message.data);
          return;
      }
  };

    function sendMessage() {
        if (validMessage()) {
            connection.send(name.value.replace(/[<]/g,'&lt').replace(/[>]/g,'&gt') + ": " + text.value.replace(/[<]/g,'&lt').replace(/[>]/g,'&gt'));
            document.getElementById("message").value = "";
        }
    }
};

var validMessage = function () {
    return document.getElementById("message").value != "";
};