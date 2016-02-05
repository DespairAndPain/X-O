$(function() {
    var connected = false;
    var socket = io();
    var $container = $('.container');
    var $playerStatus = $('.playerStatus');
    var $field = $('.field');
    var secondPlayer = false;
    $('.playField').hide();
    $('.red').hide();
    $('.blue').hide();
    $('.waitBlue').hide();
    $('.waitRed').hide();

    function makeField (width, lenght, side) {

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
                if (side==='red') {
                    $(this).addClass('btn-danger');
                } 

                if (side==='blue') {
                    $(this).addClass('btn-primary');
                }
                console.log(side);
                socket.emit('click on field', {'id':attr, 'side': ''+side+''});

                if (side==='red') {
                    var len = $('.btn-danger').length;
                    var items = $('.btn-danger');
                } 

                if (side==='blue') {
                    var len = $('.btn-primary').length;
                    var items = $('.btn-primary');
                }
                var objLocation = {};
                var n = 0;

                function objMaker (arr, iter) {
                    objLocation[''+iter+'']= arr;
                    
                }

                items.each(function() {

                    var arrLocation = $(this).attr('id').split('_');
                    n++;
                    objMaker(arrLocation, n)
                })
                

                console.log(objLocation);

                checkLocationFunc(objLocation);

                if (side==='red') {
                    $('.waitBlue').show();
                } 

                if (side==='blue') {
                    $('.waitRed').show();
                }
                

            });

}

function checkLocationFunc(obj) {

    var win = false;

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
}

}

socket.on('click from other player', function(data) {

    console.log("click is come from the other side");
    if (data.side === 'red') {
        $('#'+ data.id +'').addClass('btn-danger');
        $('.waitRed').hide();
    }
    if (data.side === 'blue') {
        $('#'+ data.id +'').addClass('btn-primary');
        $('.waitBlue').hide();
    }



});


socket.on('configForOther', function(data) {
    var lenght = data.lenght;
    var width = data.width; 

    makeField(width, lenght, 'blue');
    console.log('Config is come');
    $('.config').fadeOut();
    $('.blue').fadeIn();
    $('.playField').fadeIn();

});


$('.op2').click(function () {

    console.log('sdadsa');  
    var lenght = $('.lenght').val();
    var width = $('.width').val();  

    makeField(width, lenght, 'red');

    socket.emit('field config', {'lenght': lenght,
        'width' : width});

    console.log('Config is out');

    $('.config').fadeOut();
    $('.playField').fadeIn();
    $('.red').fadeIn();

});



});

