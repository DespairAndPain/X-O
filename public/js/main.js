$(function() {
	var connected = false;
	var socket = io();
	var $container = $('.container');
	var $playerStatus = $('.playerStatus');
	var $field = $('.field');
	var secondPlayer = false;



	function makeField (width, lenght) {
		var n = 0;
		for (var i = 1;i<=width;i++) {
			$field.append('<ul class=" ul' + i + '">');

			for (var y = 1;y<=lenght;y++) {
				$field.append('<li class="btn btn-default btnl '
					+ n +' " id="' + i + '_'+
					y + '" ></li>');
				n++;				
			}
			$field.append('</ul>');
		}

		$field.delegate('li', 
			'click',  function() {
				console.log('click');
				var attr = $(this).attr("id");
				var arrAttr = attr.split('_');
				console.log(arrAttr+ '  '+ arrAttr[0]+ '  '+ arrAttr[1]);

				$(this).addClass('btn-danger');

				socket.emit('click on field', {'id':attr});

				socket.on('click from other player', function(data) {

					console.log("click is come from the other side");
					$('#'+ data.id +'').addClass('btn-danger');
				});

				
			});
	}


	$('.op').click(function () {

		var username = $('.form-control').val();	

		socket.emit('click', {'username': username});
	});

//	socket.on('click from other player', function(data) {
//
//		console.log("click is come from the other side");
//		$('#'+ data.id +'').addClass('btn-danger');
//	});

	socket.on('login', function(data) {

		$playerStatus.append('<h1>User '+data.username + " just joined!</h1>");
		console.log(secondPlayer);
	});
	

	socket.on('configForOther', function(data) {
		var lenght = data.lenght;
		var width = data.width;	

		makeField(width, lenght);

		$playerStatus.append('<h1>User '+data.username + " just joined!</h1>");
		console.log('Config is come');
	});


	$('.op2').click(function () {

		console.log('sdadsa');	
		var lenght = $('.lenght').val();
		var width = $('.width').val();	

		makeField(width, lenght);

		socket.emit('field config', {'lenght': lenght,
			'width' : width});

		console.log('Config is out');
	});

	

});

