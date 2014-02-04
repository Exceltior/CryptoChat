var User = require('./UserF');

var room = {

	init: function(id, password, io){
		this.io = io;
		
		this.id = id;
		this.password = password;
		this.userList = {};
		var self = this;
		
		this.socket = io.of('/room/'+id);
		
		this.socket.on('connection', function (socket) {
			//var address = socket.handshake.address;
			self.newUser(socket);
			
			socket.emit('provide:pubKey');
			
			socket.on('msg', function(data) {
				// data = {uidFrom: xxx, uidTo: xxx, msg: xxx}
				console.log(data);
				var socketTo = self.socket.sockets[data.uidTo];
				if(socketTo && data.uidFrom !== data.uidTo){
					console.log('sending');
					socketTo.emit('msg',{uidFrom: this.id, msg: data.msg});
				}
			});
			
			socket.on('debug', function(data) {
				console.log(data);
			});
			
			socket.on('pubKey:set', function(data) {
				self.userList[socket.id].pubKey = data.pubKey;
				socket.broadcast.emit('user:details',{uid: socket.id, pubKey: data.pubKey, nickname: self.userList[socket.id].nickname});
			});
			
			socket.on('disconnect', function () {
				delete self.userList[socket.id];
				socket.broadcast.emit('user:disconnect',{uid: socket.id});
			});
		});
	
	},
	
	newUser: function(socket){
		var self = this;
		//User.init(socket.id,socket);
		var u = new User(socket.id,socket);
		u.nickname = self.generateUniqueUserName(u);
		this.userList[socket.id] = {pubKey: u.pubKey, nickname: u.nickname};

		socket.emit('user:all', this.userList);
		socket.emit('user:self', {uid: socket.id, nickname: u.nickname});
	},
	
	generateUniqueUserName: function(user){
		
		var username;
		var x = 1;
		var count = 0;
		while(x > 0 && count < 20){
			x = 0;
			username = user.generateUsername();
			for(var i in this.userList){
				var a = this.userList[i];
				if(a.nickname === username)
					x++;
			}
			count++;
		}
		
		return username;
	}
	
	
}

module.exports = room;