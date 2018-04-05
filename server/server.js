const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var port = process.env.PORT || 3000;
var router = express.Router();
var app = express();
var server = http.createServer(app);
var io =  socketIO(server);

var {generateMessage,generateLocationMessage} = require('./utils/message')


const publicpath = path.join(__dirname,'../public');

router.use(express.static(publicpath));

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('newMessge',generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));

  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    // callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnect',()=>{
    console.log('User was disconnected');
  });
});






app.use('/',router);

server.listen(port,()=>{
  console.log('Server is up on '+port);
});
