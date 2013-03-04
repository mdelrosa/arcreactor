
/*
 * GET home page.
 */

var echojs = require('echojs'),
    echoAPI = "VZC2UXVOYIIFGURRH";

var echo = echojs({
  key: echoAPI
});

exports.index = function(req, res){
  //randomly generate pie graphic
  var counts = [];
  for (i=0;i<10;i++) {
  	counts.push(Math.floor(Math.random()*10))
  }
  // res.render('homepage', { title: 'Arc Reactor', counts: counts, Songs:""});

  echo('song/search').get({
   artist: 'psy',
   title: 'gangnam style',
   bucket: ['tracks', 'id:rdio-US']
  }, function (err, json) {
    console.log(json.response.songs);
    var songs = json.response.songs;
    var tracks = [];
    for (i=0;i<songs.length;i++) {
      tracks.push(songs[i].tracks)
    }
    console.log(tracks);
    var count = 0;
    while (tracks[count].length < 1) {
      count += 1;
      console.log(tracks[count])
    }
    console.log(tracks[count][0])
    res.render('index', {title: 'ArcReactor', counts: counts, APIkey: echoAPI, trackID: tracks[count][0].id});
  });
};