



var fs = require('fs');

 
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;




var seats = [       // 0 빈 공간, 1 예약가능 좌석, 2 예약이 완료된 좌석

    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],

];

 

//웹 서버 생성

var app = express();

 

//미들웨어 설정

//app.use(app.router);

 

//라우트 수행

 

app.get('/', function (request, response, next) {

    fs.readFile('/index.html', function (error, data) {

        response.send(data.toString());

    });

});

app.get('/seats', function (request, response, next) {

    response.send(seats);

});

 


//소켓 서버를 생성 및 실행합니다.
io.on('connection', function(socket){
   socket.on('reserve', function (data) {

        

        seats[data.y][data.x] = 2;

        io.sockets.emit('reserve', data);
 });
});

http.listen(port, function(){
 console.log('listening on ' + port);
});