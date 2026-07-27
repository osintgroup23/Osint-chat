const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http, { cors: { origin: "*" } });

app.use(express.static('public'));
let messages = [];

io.on('connection', (socket) => {
  socket.emit('init', messages.slice(-50));
  socket.on('send', (data) => {
    messages.push(data);
    if(messages.length > 100) messages.shift();
    socket.broadcast.emit('send', data);
  });
});

module.exports = app;
