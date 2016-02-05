var express = require('express');
//Создание сервера на Express на 3000 порту
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

//Отправка в консоль информации о том что сервер слушает порт
server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

//Статические файлы сервера
app.use(express.static(__dirname + '/public'));


io.on('connection', function(socket) {

	//При подключении отправляет всем остальным пользователям сообщение о подключении пользователя
	socket.broadcast.emit('other player');

	//Реакция на нажатие кнопки Touch
	socket.on('field config', function(data) {
		
		//Отправляет всем остальным пользователям запрос на построение игрового поля 
		// как у нажавшего на кнопку игрока
		// data содержит длину и ширину игрового поля
		socket.broadcast.emit('configForOther', data);
	});

	//Реакция на нажатие на игровом поле 
	socket.on('click on field', function(data) {

		//data - массив из коортинат Y и X, а так же сторона нажавшего
		socket.broadcast.emit('click from other player',data);
	});

	//реакция на победу противника
	socket.on('you lose', function() {
		socket.broadcast.emit('lose');		
	})
});



