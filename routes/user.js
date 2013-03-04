var models = require('../models'),
Song = models.Song;

var echojs = require('echojs'),
    echoAPI = "VZC2UXVOYIIFGURRH";

var echo = echojs({
  key: echoAPI
});

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.upload = function(req, res){
  var song = req.body.song,
  artist = req.body.artist,
  src = req.body.location;
  echo('song/search').get({
    artist: artist,
    title: song,
    bucket: ['tracks', 'id:rdio-US']
  }, function (err, json) {
	    console.log(json.response);
	    var songs = json.response.songs;
	    var ids = []
	    for (i in json.response.songs){ 
	      if (songs[i].tracks.length!=0){
	        ids.push(songs[i].tracks[0].id);
	      }
	    }
	    if (ids.length!=0)
	      console.log(ids);
	    var trackID = ids[0] || 'err';
	    console.log(trackID);
	    if (trackID == 'err'){
	    	var err = 'No tracks found'
	    	res.send(err);
	    	return console.log(err);
	    }
	    else{
	    	var dbSong = new Song({name: song, artist: artist, src: src, id: trackID})
	    	dbSong.save(function(err){
	    		if (err){
	    			res.send(err);
	    			return console.log('error', err);
	    		}
	    		res.send(err);
	    	})
	    }
	});
};

exports.mash = function(req, res){
	console.log(req.body);
	res.render("mash", {title: 'Mashup'});
};