$(function() {
    //подключение socket.io
    var socket = io();
    var $container = $('.container');
    var $playerStatus = $('.playerStatus');
    var $field = $('.field');
    //Скрыть элементы информаторы до начала игры
    $('.playField').hide();
    $('.red').hide();
    $('.blue').hide();
    $('.waitBlue').hide();
    $('.waitRed').hide();
    $('.youTurn').hide();

    //Создание игрового поля
    function makeField (width, lenght, side) {

        var n = 0;

        //Вставка в документ ul и li по конфигам
        for (var i = 1;i<=width;i++) {
            // id = координаты заданного поля
            $field.append('<ul class=" ul' + i + '">');

            for (var y = 1;y<=lenght;y++) {
                $field.append('<li class="btn btn-default btnl '
                    + n +' " id="' + i + '_'+
                    y + '" ></li>');
                n++;                
            }
            $field.append('</ul>');
        }

        //Показать сообщение о ожидании красного игрока после нажатие кнопки синим
        if (side==='blue') {
            $('.waitRed').show();
        }

        //Убрать надпись о вводе конфигураций поля
        $('.size').hide();

        //Назначения эвента click на созданные li
        $field.delegate('li', 
            'click',  function() {

                // Сбор координат нажатой кнопки в строку
                var attr = $(this).attr("id");
                // Преобразование строки в массив их Y координаты и X
                var arrAttr = attr.split('_');

                // Красить нажатые кнопки в зависимости от стороны нажавшего
                if (side==='red') {
                    $(this).addClass('btn-danger');
                } 

                if (side==='blue') {
                    $(this).addClass('btn-primary');
                }

                // Отправка координат нажатой кнопки второму игроку и стороны
                socket.emit('click on field', {'id':attr, 'side': ''+side+''});

                // Сбор нажатых кнопок в объект
                if (side==='red') {
                    var items = $('.btn-danger');
                } 

                if (side==='blue') {
                    var items = $('.btn-primary');
                }
                var objLocation = {};
                var n = 0;

                // Записывание координат каждой кнопки в объект в виде массива
                function objMaker (arr, iter) {
                    objLocation[''+iter+'']= arr;
                    
                }

                items.each(function() {

                    var arrLocation = $(this).attr('id').split('_');
                    n++;
                    objMaker(arrLocation, n)
                })
                

                // Процедура проверки выйгрыша
                checkLocationFunc(objLocation);

                // Показать надпись об ожидании другого игрока
                if (side==='red') {
                    $('.waitBlue').show();
                } 

                if (side==='blue') {
                    $('.waitRed').show();
                }
                
                $('.youTurn').hide();

            });

}

function checkLocationFunc(obj) {

    // Статус выйгрыша
    var win = false;

    // Берётся объект с массивами координат.
    // Берётся первый объект и ищется второй с такой же координатой X и координатой Y+1 (Стоящий рядом)
    // Таким образом до 5 последовательно рядом стощих ячеек
    // Аналогично и остальные (по горизонтали/диагонали)

    //Проверка выйгрыша по горизонтали
    //Извините
    for (pp in obj) {
        var check = obj[''+ pp +''][0];


        for (zz in obj) {

            if (zz !== pp) {

                if (obj[''+ zz +''][0] === check) {

                    if ( (parseInt(obj[''+ pp +''][1])+1) == obj[''+ zz +''][1]) {

                        for (xx in obj) {

                            if (obj[''+ xx +''][0] === check) {

                                if (xx !== pp && xx !== zz) {

                                    if ( (parseInt(obj[''+ zz +''][1])+1) === parseInt(obj[''+ xx +''][1])) {

                                        for (cc in obj) {

                                            if (obj[''+ cc +''][0] === check) {

                                                if (cc !== pp && cc !== zz && cc !== xx) {

                                                    if ( (parseInt(obj[''+ xx +''][1])+1) === parseInt(obj[''+ cc +''][1])) {

                                                        for (vv in obj) {

                                                            if (obj[''+ vv +''][0] === check) {

                                                                if (vv !== pp && cc !== zz && vv !== xx && vv !== cc) {

                                                                    if ( (parseInt(obj[''+ cc +''][1])+1) === parseInt(obj[''+ vv +''][1])) {
                                                                        win = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }   
    }

    //Проверка выйгрыша по вертикали
    //Извините
    for (pp in obj) {
        var check = obj[''+ pp +''][1];

        for (zz in obj) {

            if (zz !== pp) {

                if (obj[''+ zz +''][1] === check) {

                    if ( (parseInt(obj[''+ pp +''][0])+1) == obj[''+ zz +''][0]) {

                        for (xx in obj) {

                            if (obj[''+ xx +''][1] === check) {

                                if (xx !== pp && xx !== zz) {

                                    if ( (parseInt(obj[''+ zz +''][0])+1) === parseInt(obj[''+ xx +''][0])) {

                                        for (cc in obj) {

                                            if (obj[''+ cc +''][1] === check) {

                                                if (cc !== pp && cc !== zz && cc !== xx) {

                                                    if ( (parseInt(obj[''+ xx +''][0])+1) === parseInt(obj[''+ cc +''][0])) {

                                                        for (vv in obj) {

                                                            if (obj[''+ vv +''][1] === check) {

                                                                if (vv !== pp && cc !== zz && vv !== xx && vv !== cc) {

                                                                    if ( (parseInt(obj[''+ cc +''][0])+1) === parseInt(obj[''+ vv +''][0])) {
                                                                        win = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }   
    }

    //Проверка выйгрыша по диагонали вправо-вниз
    //Извините
    for (pp in obj) {
        var checkX = parseInt(obj[''+ pp +''][1]);
        var checkY = parseInt(obj[''+ pp +''][0]);

        for (zz in obj) {

            if (zz !== pp) {

                if (parseInt(obj[''+ zz +''][1]) === (checkX + 1) && 
                    parseInt(obj[''+ zz +''][0]) === (checkY + 1)) {

                    checkX = parseInt(obj[''+ zz +''][1]);
                    checkY = parseInt(obj[''+ zz +''][0]);

                    for (xx in obj) {

                        if (xx !== pp & xx !== zz) {

                            if (parseInt(obj[''+ xx +''][1]) === (checkX + 1) && 
                                parseInt(obj[''+ xx +''][0]) === (checkY + 1)) {

                                checkX = parseInt(obj[''+ xx +''][1]);
                                checkY = parseInt(obj[''+ xx +''][0]);

                                for (cc in obj) {

                                    if (cc !== pp & cc !== zz & cc !== xx) {

                                        if (parseInt(obj[''+ cc +''][1]) === (checkX + 1) && 
                                            parseInt(obj[''+ cc +''][0]) === (checkY + 1)) {

                                            checkX = parseInt(obj[''+ cc +''][1]);
                                            checkY = parseInt(obj[''+ cc +''][0]);

                                            for (vv in obj) {

                                                if (vv !== pp & vv !== zz & vv !== xx) {

                                                    if (parseInt(obj[''+ vv +''][1]) === (checkX + 1) && 
                                                        parseInt(obj[''+ vv +''][0]) === (checkY + 1)) {

                                                        win = true;
                                                    }
                                                }
                                            }
                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                }
            }
        }
    }       
    
    //Проверка выйгрыша по диагонали вправо-вверх
    //Извините
    for (pp in obj) {
        var checkX = parseInt(obj[''+ pp +''][1]);
        var checkY = parseInt(obj[''+ pp +''][0]);
        var numb = 0;

        for (zz in obj) {

            if (zz !== pp) {

                if (parseInt(obj[''+ zz +''][1]) === (checkX - 1) && 
                    parseInt(obj[''+ zz +''][0]) === (checkY + 1)) {

                    checkX = parseInt(obj[''+ zz +''][1]);
                    checkY = parseInt(obj[''+ zz +''][0]);

                    for (xx in obj) {

                        if (xx !== pp & xx !== zz) {

                            if (parseInt(obj[''+ xx +''][1]) === (checkX - 1) && 
                                parseInt(obj[''+ xx +''][0]) === (checkY + 1)) {

                                checkX = parseInt(obj[''+ xx +''][1]);
                                checkY = parseInt(obj[''+ xx +''][0]);

                                for (cc in obj) {

                                    if (cc !== pp & cc !== zz & cc !== xx) {

                                        if (parseInt(obj[''+ cc +''][1]) === (checkX - 1) && 
                                            parseInt(obj[''+ cc +''][0]) === (checkY + 1)) {

                                            checkX = parseInt(obj[''+ cc +''][1]);
                                            checkY = parseInt(obj[''+ cc +''][0]);

                                            for (vv in obj) {

                                                if (vv !== pp & vv !== zz & vv !== xx) {

                                                    if (parseInt(obj[''+ vv +''][1]) === (checkX - 1) && 
                                                        parseInt(obj[''+ vv +''][0]) === (checkY + 1)) {

                                                        win = true;
                                                    }
                                                }
                                            }
                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                }
            }
        }
    }     

if (win) {
    alert("You'r WIN!!!");
    socket.emit('you lose');
}



}

// Проигравшему отключаются всё кроме сетки
socket.on('lose', function() {
    $('.red').hide();
    $('.blue').hide();
    $('.waitBlue').hide();
    $('.waitRed').hide();
    $('.youTurn').hide();

    alert('You lose (');
})

// Реакция на клик противника
socket.on('click from other player', function(data) {

    // В зависимости от стороны кликнувшего красит кнопки в разные цвета
    if (data.side === 'red') {
        $('#'+ data.id +'').addClass('btn-danger');
        $('.waitRed').hide();
    }
    if (data.side === 'blue') {
        $('#'+ data.id +'').addClass('btn-primary');
        $('.waitBlue').hide();
    }

    $('.youTurn').show();
    $('.size').hide();

});

// Реакция на построение сетки от противника, создаёт поле и убирает отсальные элементы
socket.on('configForOther', function(data) {
    var lenght = data.lenght;
    var width = data.width; 

    makeField(width, lenght, 'blue');
    console.log('Config is come');
    $('.config').fadeOut();
    $('.blue').fadeIn();
    $('.playField').fadeIn();

});

// Обработчик нажатия кнопки Touch
$('.op2').click(function () {

    console.log('sdadsa');  
    var lenght = $('.lenght').val();
    var width = $('.width').val();  

    makeField(width, lenght, 'red');
    // Создаёт поле у себя и у противника
    socket.emit('field config', {'lenght': lenght,
        'width' : width});

    console.log('Config is out');

    $('.config').fadeOut();
    $('.playField').fadeIn();
    $('.red').fadeIn();
    $('.youTurn').show();

});

socket.on('other player', function(){
    alert('Второй игрок подключился');
})


});

