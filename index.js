const express = require("express");
const socket = require("socket.io");
const app = express();

let server = app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running on port: " + server.address().port);
});

let io = socket(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Connected to" + socket.id);

  socket.on("join", (roomName) => {
    let rooms = io.socket.adapter.rooms;
    let room = rooms.get(roomName);

    if(room == undefined) {
      socket.join(roomName);
      console.log("Room created");
    } else if (room.size == 1) {
      socket.join(roomName);
      console.log("Room Joined");
    } else {
      console.log("Room is already full");
    }
    console.log(rooms);
    
  });
});
