$(function() {
    var connected = false;
    var socket = io();
    var $container = $('.container');
    var $playerStatus = $('.playerStatus');
    var $field = $('.field');
    var secondPlayer = false;

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

                var len = $('.btn-danger').length;
                var items = $('.btn-danger');
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

            });

}

function checkLocationFunc(obj) {
    //for (i in obj) {
    //    obj[''+ i +''][0] 
    //    for (i in op) {console.log(op[''+i+''][0]);}
    //
    var maxVar = 0;

    for (pp in obj) {
        var checkedX = obj[''+ pp +''][0];
        var numb = 0;

        console.log(checkedX + ' checkedX');

        for (zz in obj) {
            if (zz !== pp) {
                console.log(obj[''+ zz +''][0]+ ' 2 level');
                if (obj[''+ zz +''][0] === checkedX) {
                    numb++;
                    console.log('true');
                    console.log(obj[''+ pp +''][0]+ '  +1 sss  ' + (parseInt(obj[''+ pp +''][1])+1));
                    console.log(obj[''+ zz +''][0]+ '  sss  ' + obj[''+ zz +''][1]);
                    if ( (parseInt(obj[''+ pp +''][1])+1) == obj[''+ zz +''][1]) {
                        console.log('YEAH'+zz);
                    }
                }
            }


        }
        console.log(pp + ' obj');
        console.log(numb + ' numb');

        if (maxVar < numb) {
            maxVar = numb;
        }

        

    }   
    console.log(maxVar + ' max numb');

}

socket.on('click from other player', function(data) {

    console.log("click is come from the other side");
    if (data.side === 'red') {
        $('#'+ data.id +'').addClass('btn-danger');
    }
    if (data.side === 'blue') {
        $('#'+ data.id +'').addClass('btn-primary');
    }

});


socket.on('configForOther', function(data) {
    var lenght = data.lenght;
    var width = data.width; 

    makeField(width, lenght, 'blue');
    console.log('Config is come');
});


$('.op2').click(function () {

    console.log('sdadsa');  
    var lenght = $('.lenght').val();
    var width = $('.width').val();  

    makeField(width, lenght, 'red');

    socket.emit('field config', {'lenght': lenght,
        'width' : width});

    console.log('Config is out');
});



});

