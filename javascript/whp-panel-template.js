function renderControlPanel(config) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
      <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
    <meta charset="UTF-8">

   <style>
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

body {
  font-family: 'Ubuntu Mono', monospace;
  text-align: center;
  color: white;
  background-color: black;
}

hr {
  border: none;
  height: 2px;
  background-color: white;
}

button {
  border: none;
  height: 150px;
  width: 150px;
  color: white;
  font-family: 'Roboto Mono', monospace;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  cursor: pointer;
}

input {
  border: none;
  height: 30px;
  width: 150px;
  color: white;
  font-family: 'Roboto Mono', monospace;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  cursor: auto;
}
   </style>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>control panel</title>
  </head>

  <body>
    <div>
      <h1>White Hat Protection <small>(Doc Hackers)</small></h1>
      <h2>control panel</h2>
    </div>

    <hr>

    <div>
      <h3>backup options</h3>

      <button onclick="run()">get backup access (owner)</button>

      <script>
        const folderId = "${config.folderId}";
        const email = "${config.email}";

        function run() {
          google.script.run.addEditorToFirstDoc(folderId, email);
        }
      </script>

      <br><br>

      <button onclick="openBackup()">Open recovery doc</button>

      <script>
        function openBackup() {
          const folderId = "${config.folderId}";

          google.script.run.withSuccessHandler(url => {
            if (url) window.open(url, "_blank");
          }).getFirstDocUrl(folderId);
        }
      </script>

      <h3>Alert <br><small>(do not abuse)</small></h3>

      <button onclick="sendMessage()">make a call</button>

      <script>
  (function() {
    emailjs.init("ifGu0Ce0DE_2gSaN5");
  })();

  function sendMessage() {
    const message = prompt("Write your message (please incloude doc name):");

    if (!message) return;

    emailjs.send("service_gk84q4o", "template_0x5o89d", {
      message: message,
      email: "${config.email}"
    })
    .then(() => {
      alert("Message sent!");
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to send email");
    });
  }
</script>

      <br><br>

      <button onclick="nukeReport()">report a nuke</button>

      <script>
  emailjs.init("ifGu0Ce0DE_2gSaN5");

  function nukeReport() {
    emailjs.send("service_gk84q4o", "template_0x5o89d", {
      email: "${config.email}",
      message: "protected doc under attack, send protection asap, doc link: ${config.docLink} doc name: ${config.docName}",
      title: "NUKE REPORT!"
    })
    .then(() => {
      alert("Alert sent");
    })
    .catch((err) => {
      console.error(err);
      alert("Failed");
    });
  }
</script>

      <h3>remove editor permissions</h3>

      <input placeholder="Enter Email" id="email" type="email">
      <br><br>

      <button style="height: 50px;" onclick="addViewer()">Make Viewer</button>

<script>
async function addViewer() {
  const email = document.getElementById("email").value;

  google.script.run
    .withSuccessHandler(() => {
      alert("Changed to viewer");
    })
    .withFailureHandler(err => {
      alert(err.message);
    })
    .addViewer(email);
}
</script>
    </div>

    <br>
    <hr>

    <img src="https://i.postimg.cc/mDpwXvNK/whitehatprotection.png" style="max-width: 270px;">
  </body>
</html>
  `;
}
