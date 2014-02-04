var room = require('../RoomF');
var crypto = require('crypto'),
	io = require('../app.js').io;

var rooms = {}

exports.createPost = function(req, res){
	var timec = crypto.createHash('sha1').update((new Date()).valueOf().toString()).digest('hex');
	var id = crypto.randomBytes(20).toString('hex');
	var uid = timec.substr(0,6) + id.substr(0,6);
	
	var password = req.body.password;
	
	room.init(uid,password,io);
	
	rooms[uid] = room;
	req.session.loggedin = 'true';
	res.redirect('/room/' + uid);
	
	//res.render('room', { title: 'Inside the room' });
};

exports.create = function(req, res){
	res.render('room_create', { title: 'Creating a room' });
}

exports.main = function(req, res){

	//if(req.session.loggedin && req.session.loggedin === 'true'){
	
		var uid = req.params.uid;
		res.render('room', {title: 'Inside the room', room: rooms[uid]});
	//}
	//else
		//res.redirect('/room/' + uid + '/login');
	
}

exports.login = function(req, res){
	if(req.session.loggedin && req.session.loggedin === 'true'){
		res.redirect('/room/' + uid);
	}
	else
		res.render('room_login', { title: 'Route Separation Example' });
}

exports.loginPost = function(req, res){
	var uid = req.params.uid;
	var password = req.body.password;
	
	if(rooms[uid].password === password){
		req.session.loggedin = 'true';
		res.redirect('/room/' + uid);
	}
}