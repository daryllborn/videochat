const express = require("express");
const socket = require("socket.io");
const app = express();

let server = app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running on port: " + server.address().port);
});

app.use(express.static("public"));

let io = socket(server);

io.on("connection", (socket) => {
  console.log("Connected to" + socket.id);

  socket.on("join", (roomName) => {
    console.log(roomName);
  });
});
