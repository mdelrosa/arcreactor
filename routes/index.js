
/*
 * GET home page.
 */

exports.index = function(req, res){
  var counts = [];
  for (i=0;i<10;i++) {
  	counts.push(Math.floor(Math.random()*10))
  }
  res.render('homepage', { title: 'ArcReactor', counts: counts, Songs:""});
};