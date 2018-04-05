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

socket.on('newlocationMessage',function(message){
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}:`);
  a.attr('href',message.url);
  li.append(a);
  $("#message").append(li);

});


var locationButton = $('#send-location');
locationButton.on('click',function(){
  if(navigator.geolocation){
    return alert('Geolocaiton not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    alert('Unable to fetch location');
  });
});
