
var io = require('socket.io')(http);
var express = require('express');
var http =  http.createServer(app)
var fs = require('fs');
var app = express();
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

 

 

//미들웨어 설정

//app.use(app.router);

 

//라우트 수행

 

app.get('/', function (request, response, next) {

    fs.readFile('index.html', function (error, data) {

        response.send(data.toString());

    });

});

app.get('/seats', function (request, response, next) {

    response.send(seats);

});

 // 웹 서버를 실행합니다.
//var server = http.createServer(app)
//server.listen(52273, function () {
//console.log('Server Running at http://127.0.0.1:52273');
//});


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