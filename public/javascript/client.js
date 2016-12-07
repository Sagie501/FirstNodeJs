(function () {
var textColor = "black";
var classesToAdd = [];

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
      //messageP.style["color"] = jsonMessage.color;

      for (var index = 0; index < classesToAdd.length; index++) {
          messageP.style[classesToAdd[index].property] = classesToAdd[index].value;
      }

      userNameP.innerHTML = jsonMessage.name + ": ";
      messageP.innerHTML = jsonMessage.text;

      rowDiv.appendChild(userNameP);
      rowDiv.appendChild(messageP);

      documentFragment.appendChild(rowDiv);

      posts.appendChild(documentFragment);
  } catch (e) {
      console.log("Error: invalid json: ", message.data);
  }
};

function sendMessage() {
    if (validMessage()) {
        if (document.getElementById("message").value.charAt(0) == "/") {
            command(document.getElementById("message").value);
        } else {
            connection.send(JSON.stringify({
                name: validXSS(document.getElementById("username").value),
                text: validXSS(document.getElementById("message").value),
                color: textColor
            }));
        }
        document.getElementById("message").value = "";
    }
}

var validMessage = function () {
    return document.getElementById("message").value != "";
};

var validXSS = function (strToValid) {
    return strToValid.replace(/[<]/g,'&lt').replace(/[>]/g,'&gt');
};

var command = function (command) {
    var commandSplited = command.split(" ");

    var commandsWithOneArg = {
        '/setcolor': function (color) {
            return setColor(color);
        }
    };

    var commandsWithOutArg = {
        '/setbold': function () {
            return setBold();
        },

        '/setitalic': function () {
            return setItalic();
        }
    };
    if (commandSplited.length === 1) {
        commandsWithOutArg[commandSplited[0].toLowerCase()]();
    } else if (commandSplited.length === 2) {
        commandsWithOneArg[commandSplited[0].toLowerCase()](commandSplited[1]);
    }
};

var setColor = function (color) {
    classesToAdd.push({property: "color", value: color});
};

var setBold = function () {
    var index = checkObjectInArray("font-weight", "bold");

    if (index > -1) {
        classesToAdd.splice(index, 1);
    } else {
        classesToAdd.push({property: "font-weight", value: "bold"});
    }
};

var setItalic = function () {
    var index = checkObjectInArray("font-style", "italic");

    if (index > -1) {
        classesToAdd.splice(index, 1);
    } else {
        classesToAdd.push({property: "font-style", value: "italic"});
    }
};

var checkObjectInArray = function (pro, val) {
    for (var index = 0; index < classesToAdd.length; index++) {
        if (classesToAdd[index].property === pro && classesToAdd[index].value === val) {
            return index;
        }
        return -1;
    }
};
})();