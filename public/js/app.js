var scrollPane;
var socket = io.connect('http://localhost:80/room/'+roomUID);
var crypto = window.crypto;

$(function(){
	scrollPane = $('.scroll-pane').jScrollPane().data('jsp');

});

/*
var keypair = openpgp.generateKeyPair(1,1024,'userid', pass);
var publicKey = openpgp.key.readArmored(keypair.publicKeyArmored);
var cryptedMsg = openpgp.encryptMessage(publicKey.keys,"olaaa");

var privKey = openpgp.key.readArmored(keypair.privateKeyArmored).keys[0];
privKey.decrypt(pass);

openpgp.decryptMessage(privKey,message)
message.decrypt(privKey).getText()

*/

var getMessageHtml = function(from, timestamp, msg){
	return "<p>("+timestamp+")<strong>"+from+":</strong> "+msg+"</p>";
}

var roomUID = window.location.pathname.split('/')[2];

var userList = {}

var userSelf = {
	nickname: null,
	pubKey: null,
	privKey: null,
	uid: null
}

socket.on('console', function (data) {
	console.log(data);
});

socket.on('provide:pubKey', function (data) {
	socket.emit('pubKey:set',{uid: userSelf.uid, pubKey: userSelf.pubKey});
});

socket.on('msg', function (data) {
	var markup = getMessageHtml(data.uidFrom, data.timestamp, data.msg);
	scrollPane.getContentPane().append(markup);
	scrollPane.reinitialise();
    scrollPane.scrollToBottom(true);
	console.log(data);
});

socket.on('user:details', function (data) {
	console.log(data);
	userList[data.uid] = {pubKey: data.pubKey, nickname: data.nickname}
});

socket.on('user:self', function (data) {
	userSelf.uid = data.uid;
	userSelf.nickname = data.nickname;
});

socket.on('user:all', function (data) {
	userList = data;
	console.log(data)
});

socket.on('user:disconnect', function (data) {
	delete userList[data.uid];
});

