var socket = io();

socket.on('connect',function(){
  socket.emit('getRoomList',function(rooms){
    var roomlist = $('#room_list');
    for(room in rooms){
      roomlist.append($('<option></option>').text(rooms[room]));
    }
  });
});
