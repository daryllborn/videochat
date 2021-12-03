const express = require("express");
const socket = require("socket.io");
const app = express();

let server = app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running on port: " + server.address().port);
});

let io = socket(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Connected to " + socket.id);

  socket.on("join", (roomName) => {
    let rooms = io.sockets.adapter.rooms;
    let room = rooms.get(roomName);

    if(room == undefined) {
      socket.join(roomName);
      socket.emit("created")
    } else if (room.size == 1) {
      socket.join(roomName);
      socket.emit("joined")
    } else {
      socket.emit("full")
    }
    console.log(rooms);    
  });

  socket.on("ready", (roomName) => {
    socket.broadcast.to(roomName).emit("ready");
    console.log("ready");
  });

  socket.on("candidate", (candidate, roomName) => {
    socket.broadcast.to(roomName).emit("candidate", candidate);
    console.log("candidate");
  });

  socket.on("offer", (offer, roomName) => {
    socket.broadcast.to(roomName).emit("offer", offer);
    console.log("offer");
  });

  socket.on("answer", (answer, roomName) => {
    socket.broadcast.to(roomName).emit("answer", answer);
    console.log("answer");
  });
});
