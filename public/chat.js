let socket = io.connect("http://localhost:5000");
let videoChatLobby = document.getElementById("video-chat-lobby");
let videoChatRoom = document.getElementById("video-chat-room");
let joinButton = document.getElementById("join");
let userVideo = document.getElementById("user-video");
let peerVideo = document.getElementById("peer-video");
let roomInput = document.getElementById("roomName");