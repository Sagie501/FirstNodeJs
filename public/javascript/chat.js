/*var textColor = "black";
var classesToAdd = [];

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

var submitMessage = function() {
    if (document.getElementById("message").value != "") {
        if (document.getElementById("message").value.charAt(0) == "/") {
            command(document.getElementById("message").value);
            document.getElementById("message").value = "";
        } else {
            var message = {
                username: document.getElementById("username").value,
                text: document.getElementById("message").value
            };
            document.getElementById("message").value = "";
            publishMessage(message, textColor);
        }
    }
};

document.getElementById("send").addEventListener("click", submitMessage);

document.getElementById("message").addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        submitMessage();
    }
});

var publishMessage = function (message, color) {
    var headDiv = document.getElementById("posts");
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "row");
    var userNameP = document.createElement("span");
    userNameP.classList.add("username");
    userNameP.style["color"] = color;
    var messageP = document.createElement("span");
    messageP.style["color"] = color;

    for (var index = 0; index < classesToAdd.length; index++) {
        messageP.classList.add(classesToAdd[index]);
    }

    userNameP.innerHTML = message.username + ": ";
    messageP.innerHTML = message.text;

    headDiv.appendChild(rowDiv);
    rowDiv.appendChild(userNameP);
    rowDiv.appendChild(messageP);
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
    textColor = color;
};

var setBold = function () {
    var index = classesToAdd.indexOf("bold");

    if (index > -1) {
        classesToAdd.splice(index, 1);
    } else {
        classesToAdd.push("bold");
    }
};

var setItalic = function () {
    var index = classesToAdd.indexOf("italic");

    if (index > -1) {
        classesToAdd.splice(index, 1);
    } else {
        classesToAdd.push("italic");
    }
};*/