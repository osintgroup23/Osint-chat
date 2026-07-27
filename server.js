const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let messages = [];

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.emit('init', messages);
  socket.on('send', (data) => {
    messages.push(data);
    if(messages.length > 100) messages.shift();
    socket.broadcast.emit('send', data);
  });
});

module.exports = httpServer;
