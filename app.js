var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
	
io.set('log level', 1);
	
exports.io = io;
	
var room = require('./routes/room');
var site = require('./routes/site');
  
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

var SITENAME = "CryptoChat";

app.get('/', site.index);
app.get('/room/:uid', room.main);
app.get('/room/:uid/login', room.login);
app.post('/room/:uid/login', room.loginPost);

app.get('/createroom', room.create);
app.post('/createroom', room.createPost);

server.listen(80);
console.log("Server listening on port 80...");