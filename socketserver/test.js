var socket = io.connect('http://localhost:5999');

$(document).keydown(function(event){
  if(event.which == 80){
    console.log('pressed');
    socket.emit('pressed', socket.id);
    $('#mainbody').append("<p>You pressed it, my dude!</p>");
  }
  if(event.which == 32){
    event.preventDefault();
    console.log('state change');
    socket.emit('nextstate', socket.id);
  }
});

socket.on('otherpressed', function(){
  $('#mainbody').append("<p>Somebody else pressed it, my dude!</p>")
});

socket.on('newplayer', function(){
  $('#mainbody').append("<p>A new player has joined!</p>")
});

socket.on('playerleft', function(){
  $('#mainbody').append("<p>A player has left.</p>")
});
