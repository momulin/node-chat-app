var socket = io();

socket.on('connect',function(){
  console.log('Connected to server');
});

socket.on('disconnect',function(){
  console.log('Disconnect from server');
});

socket.on('connect',function(){
  socket.emit('createMessage',{
    from:'momu',
    text:'hello!'
  });
});


socket.on('newMessage',(message)=>{
  console.log(message);
});
