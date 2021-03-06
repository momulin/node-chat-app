var socket = io();

function scrollToBottom(){
  console.log($('#messages'));
  $('#messages').scrollTop($('#messages')[0].scrollHeight);
};

socket.on('connect',function(){
  var params = $.deparam(window.location.search);
  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href = "/";
    }else{
      console.log('No error');
    }
  });
});

socket.on('disconnect',function(){
  console.log('Disconnect from server');
});

socket.on('updateUserList',function(users){
  var ol = $('<ol></ol>');
  users.forEach(function(user){
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
});

socket.on('newMessage',(message)=>{
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    text:message.text,
    createAt:formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    url:message.url,
    createAt:formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});

$('#message-form').on('submit',function(e){
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage',{
    text:messageTextbox.val()
  },function(){
    messageTextbox.val('')
  });
});


var locationButton = $('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocaiton not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
