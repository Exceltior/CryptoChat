/*var user = {
	init: function(id, socket) {
		this.id = id;
		this.nickname = null;
		this.pubKey = null;
		this.socket = socket;

	},
	
	generateUsername: function(){
		var list = ["woodenslabgray",	"bisonfield",	"overtpenitent",	"divergentlist",	"shuttoupee",
					"brutalcomplex",	"jodrellillustrious",	"chickenbanner",	"stackcoherent",	"blushuneasiness",
					"growltall",	"livelycanoe",	"skimpybumper",	"cantankeroushungarian",	"crabbypopped",
					"gracefulbap",	"wigvomer",	"kindheartedrepulsive",	"handleragged",	"cyanwoolshrivel",
					"ickysine",	"geldingtomatoe",	"birdsmoldy",	"skatinghotpot",	"coldindigo",
					"tiesalty",	"overwroughtmandible",	"dejectedpaddling",	"whimperchef",	"pintaildermis",
					"playerunicycle",	"scarletpushing",	"righteousloutish",	"maroonhesitant",	"snoopyfatal",
					"coughmayonnaise",	"chineseflight",	"smarthunting",	"dramaticdelighted",	"spitefulnauseating",
					"satisfyingrush",	"fascinatedmixed",	"tinsfloor",	"runningcliff",	"freezingmongolian",
					"honorablevoracious",	"pavingbluff",	"snipeironingot",	"parpwharf",	"arcanametatarsal"]
					
		return list[Math.round(Math.random()*list.length)]
	}
	
}
*/

module.exports = User;

function User(id, socket){
	this.id = id;
	this.nickname = null;
	this.pubKey = null;
	this.socket = socket;
	this.ip = null;
}

User.prototype.generateUsername = function(){
	var list = ["woodenslabgray",	"bisonfield",	"overtpenitent",	"divergentlist",	"shuttoupee",
				"brutalcomplex",	"jodrellillustrious",	"chickenbanner",	"stackcoherent",	"blushuneasiness",
				"growltall",	"livelycanoe",	"skimpybumper",	"cantankeroushungarian",	"crabbypopped",
				"gracefulbap",	"wigvomer",	"kindheartedrepulsive",	"handleragged",	"cyanwoolshrivel",
				"ickysine",	"geldingtomatoe",	"birdsmoldy",	"skatinghotpot",	"coldindigo",
				"tiesalty",	"overwroughtmandible",	"dejectedpaddling",	"whimperchef",	"pintaildermis",
				"playerunicycle",	"scarletpushing",	"righteousloutish",	"maroonhesitant",	"snoopyfatal",
				"coughmayonnaise",	"chineseflight",	"smarthunting",	"dramaticdelighted",	"spitefulnauseating",
				"satisfyingrush",	"fascinatedmixed",	"tinsfloor",	"runningcliff",	"freezingmongolian",
				"honorablevoracious",	"pavingbluff",	"snipeironingot",	"parpwharf",	"arcanametatarsal"]
				
	return list[Math.round(Math.random()*list.length)]
}