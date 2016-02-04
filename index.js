var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

var numUsers = 0;

io.on('connection', function(socket) {
	numUsers=numUsers+1;
	

	socket.on('field config', function(data) {
		console.log('config coming');
		socket.broadcast.emit('configForOther', data);
	});

	socket.on('click on field', function(data) {
		console.log(data.id);
		console.log(data.side);

		socket.broadcast.emit('click from other player',data);
	});
});



