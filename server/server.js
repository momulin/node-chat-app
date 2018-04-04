const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var port = process.env.PORT || 3000;
var router = express.Router();
var app = express();
var server = http.createServer(app);
var io =  socketIO(server);


const publicpath = path.join(__dirname,'../public');

router.use(express.static(publicpath));

io.on('connection',(socket)=>{
  console.log('New user connected');


  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createAt:new Date().getTime()
    });
  });

  socket.on('disconnect',()=>{
    console.log('User was disconnected');
  });
});






app.use('/',router);

server.listen(port,()=>{
  console.log('Server is up on '+port);
});
