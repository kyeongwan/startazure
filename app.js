// 모듈을 추출합니다.

var express = require('express');

var fs = require('fs');



var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// 변수를 선언합니다.
var seats = [
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];



// 미들웨어를 설정합니다.
app.use(app.router);

// 라우트를 수행합니다.
app.get('/', function (request, response, next) {
    fs.readFile('inext.html', function (error, data) {
        response.send(data.toString());
    });
});

app.get('/seats', function (request, response, next) {
    response.send(seats);
});




io.on('connection', function(socket){
 socket.on('reserve', function (data) {
        seats[data.y][data.x] = 2;
        io.sockets.emit('reserve', data);
    });
});

http.listen(port, function(){
 console.log('listening on ' + port);
});
