
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
<<<<<<< HEAD
  res.render('homepage', { title: 'Arc Reactor', counts: counts, Songs:""});
=======
  echo('song/search').get({
    artist: 'taylor swift',
    title: 'trouble',
    bucket: ['tracks', 'id:7digital-US']
  }, function (err, json) {
    console.log(json.response);
    console.log(json.response.songs.title);
  });
  res.render('index', { title: 'ArcReactor', counts: counts, APIkey: echoAPI});
>>>>>>> 96136f5e38e3ce4b9eb53c2c6e254c6a59517d43
};