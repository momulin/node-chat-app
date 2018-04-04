var socket = io();

socket.on('connect',function(){
  console.log('Connected to server');
});

socket.on('disconnect',function(){
  console.log('Disconnect from server');
});

socket.on('newMessage',(message)=>{
  console.log(message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#message').append(li);
});

$('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:'momu',
    text:$('[name=message]').val()
  });
});
