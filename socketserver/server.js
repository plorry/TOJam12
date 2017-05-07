
/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')

var app = express();
var http = require('http').createServer(app);

var io = require('socket.io');
var serv_io = io.listen(http);

// all environments
app.set('port', process.env.PORT || 5999);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

http.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var gamevars = {
  gamestate: 0,
  players: 0,
  presses: 0,
  knockouts: 0,
}

serv_io.sockets.on('connection', function (socket){
  gamevars.players += 1;
  console.log('new player connected');
  console.log('current playercount: ' + gamevars.players);
  socket.broadcast.emit('newplayer');

  socket.on('pressed', function(){
    gamevars.presses += 1;
    console.log(gamevars.presses);
    socket.broadcast.emit('otherpressed');
  })

  socket.on('disconnect', function(){
    gamevars.players -= 1;
    console.log('player has left');
    console.log('current playercount: ' + gamevars.players);
    socket.broadcast.emit('playerleft');
  })

  socket.on('beleive', function(){
    gamevars.gamestate = 0;

  })

});
