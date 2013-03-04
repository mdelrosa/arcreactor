var models = require('../models'),
Song = models.Song;

var echojs = require('echojs'),
    echoAPI = "VZC2UXVOYIIFGURRH";

var echo = echojs({
  key: echoAPI
});

exports.index = function(req, res){
  Song.find().sort({'_id' : 'descending'}).exec(function(err,data){
    if (err)
      return console.log ('error', err);
    res.render('homepage', { title: 'Arc Reactor', Songs: data});
  });
};



  //randomly generate pie graphic
  // var counts = [];
  // for (i=0;i<10;i++) {
  //  counts.push(Math.floor(Math.random()*10))
  // }

  // echo('song/search').get({
  //   artist: 'psy',
  //   title: 'gangnam style',
  //   bucket: ['tracks', 'id:rdio-US']
  // }, function (err, json) {
  //   console.log(json.response);
  //   var songs = json.response.songs;
  //   var ids = []
  //   for (i in json.response.songs){ 
  //     if (songs[i].tracks.length!=0){
  //       ids.push(songs[i].tracks[0].id);
  //     }
  //   }
  //   if (ids.length!=0)
  //     console.log(ids);
  //   else
  //     console.log('No tracks found');
  //   var trackID = ids[0] || err;
  //   console.log(trackID);
  //   res.render('index', { title: 'ArcReactor', counts: counts, APIkey: echoAPI, trackID: trackID});
  // });
// };

exports.update = function(req, res){
  Song.find().sort({'_id' : 'descending'}).exec(function(err,data){
    if (err)
      return console.log ('error', err);
    res.render('_songs', {Songs: data});
  });
};