var fs = require('fs');
var Player = require('player');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var player = new Player('./playlist/Kalimba.mp3');


// parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res){
	res.send('hello world');
});

app.get('/stop',function(req,res){
	player.stop();
	console.log("Player stopped!");
	res.end();
});

app.get('/play',function(req,res){
	console.log("/play");
	player.play();
	console.log("Starting player!");
	res.end();
});
app.get('/next', function(req,res){
	player.next();
	console.log("Switching to next song!");
	res.end();
});
app.post('/add',function(req,res){
	fs.readFile(req.files.song.path, function (err, data) {
       		var newPath ="/playlist/"+req.files.song.name+".mp3";
        	fs.writeFile(newPath, data, function (err) {
  	      		console.log("Added song!");
			res.end();
             	});
        });
});
app.get('/add_sample',function(req,res){
	player.add('./playlist/Sleep Away.mp3');
	console.log("added sample music file");	
	res.send("added sample music file");
});
app.post('/postaiurea',function(req,res){
	console.log(req.body);
	res.send("dada, merge merge");
});

app.listen(3000);/*

var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
 
fs.createReadStream(process.argv[2])
  .pipe(new lame.Decoder())
  .on('format', function (format) {
    this.pipe(new Speaker(format));
  });*/
console.log("Listening on port 3000");
