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
	var counts = [];
    for (i=0;i<10;i++) {
      counts.push(Math.floor(Math.random()*10))
    }
	var mongoIDs = req.body.songs,
	artists = [],
	names = [],
	ids = [],
	links = [];
	Song.find({_id: {$in: mongoIDs}}).exec(function(err, data){
		console.log(data);
		if (data.length < 2) {
			console.log('Please select more than one song!')
		}
		else {
			for (i in data){
				artists.push(data[i].artist);
				names.push(data[i].name);
				ids.push(data[i]['id']);
				links.push(data[i].src);
			}
			res.render("mash", {
		      title: 'Arc Reactor',
			  artists: artists,
			  names: names,
			  ids: ids,
			  counts: counts,
			  links: links
		    });
		}
	});
};