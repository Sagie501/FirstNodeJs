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

document.getElementById("send").addEventListener("click", function () {
   if (document.getElementById("message").value != "") {
       var message = {
           username: document.getElementById("username").value,
           text: document.getElementById("message").value
       }
       publishMessage(message);
   }
});

var publishMessage = function (message) {
    var headDiv = document.getElementById("posts");
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "row");
    var userNameP = document.createElement("span");
    userNameP.classList.add("username");
    var messageP = document.createElement("span");

    userNameP.innerHTML = message.username + ": ";
    messageP.innerHTML = message.text;

    headDiv.appendChild(rowDiv);
    rowDiv.appendChild(userNameP);
    rowDiv.appendChild(messageP);
};