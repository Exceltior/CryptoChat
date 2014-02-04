var room = require('../RoomF');
var crypto = require('crypto'),
	io = require('../app.js').io;

var rooms = {}
var title = require('../app.js').SITENAME;

exports.createPost = function(req, res){
	var timec = crypto.createHash('sha1').update((new Date()).valueOf().toString()).digest('hex');
	var id = crypto.randomBytes(20).toString('hex');
	var uid = timec.substr(0,6) + id.substr(0,6);
	
	var password = req.body.password;
	
	room.init(uid,password,io);
	
	rooms[uid] = room;
	req.session.loggedin = 'true';
	res.redirect('/room/' + uid);

};

exports.create = function(req, res){
	res.render('room_create', { title: title + ' - Creating a room' });
}

exports.main = function(req, res){
	var uid = req.params.uid;
	if(rooms[uid]){
		//if(req.session.loggedin && req.session.loggedin === 'true' && req.session.room && req.session.room === uid){
		
			res.render('room', {title: title + ' - Inside the room', room: rooms[uid]});
		//}
		//else
			//res.redirect('/room/' + uid + '/login');
	}
	else
		res.render('index', {title: title + ' - Room not found', error: {title: "Invalid room", description: "There's no room with the specified id (" + uid + ")"}});
}

exports.login = function(req, res){
	var uid = req.params.uid;
	if(req.session.loggedin && req.session.loggedin === 'true' && req.session.room && req.session.room === uid){
		res.redirect('/room/' + uid);
	}
	else
		res.render('room_login', { title: title + ' - Route Separation Example' });
}

exports.loginPost = function(req, res){
	var uid = req.params.uid;
	var password = req.body.password;
	
	if(rooms[uid].password === password){
		req.session.room = uid;
		req.session.loggedin = 'true';
		res.redirect('/room/' + uid);
	}
}