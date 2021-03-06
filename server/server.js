const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicpath = path.join(__dirname,'../public');
const {Users} = require('./utils/users');

var port = process.env.PORT || 3000;
// var router = express.Router();
var app = express();
var server = http.createServer(app);
var io =  socketIO(server);
var users = new Users();

app.use(express.static(publicpath));

io.on('connection',(socket)=>{
  console.log('New user connected');


  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
    callback();

    socket.on('createMessage',(message,callback)=>{
      var user = users.getUser(socket.id);

      if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
      }

      callback();
    });

    socket.on('createLocationMessage',(coords)=>{
      var user = users.getUser(socket.id);

      if(user){
        io.to(params.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
      }

    });

  });


  socket.on('getRoomList',(callback)=>{
      var availableRooms = [];
      var rooms = io.sockets.adapter.rooms;
      if (rooms) {
          for (var room in rooms) {
              if (!rooms[room].sockets.hasOwnProperty(room)) {
                  availableRooms.push(room);
              }
          }
      }
      return callback(availableRooms);
  });


  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
    }
  });
});







// app.use('/',router);

server.listen(port,()=>{
  console.log('Server is up on '+port);
});
