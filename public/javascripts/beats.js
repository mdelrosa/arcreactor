// Add beats or bars of a track to a live queue.
// You will need to supply your Echo Nest API key, the trackID, and a URL to the track.
// The supplied track can be found in the audio subdirectory.
  

$(document).ready(function() {
  var apiKey = 'VZC2UXVOYIIFGURRH';
  var trackID_string = $('.chord').attr('name');
  var trackURL = 'media/codemonkey.mp3';

  var trackIDs = trackID_string.split(',');
  console.log('trackIDs', trackIDs);

  var remixer;
  var player;
  var track;
  var remixed;
  var tracks;

  $('.addBar').click(function() {
    var index = $("#indexBox").val();
    player.queue(track.analysis.bars[index])
    console.log('here')
  });

  $('.addBeat').click(function() {
    var index = $("#indexBox").val();
    player.queue(track.analysis.beats[index])
  });

  function init() {
    var beats = [];
    var context = new webkitAudioContext();
    remixer = createJRemixer(context, $, apiKey);
    player = remixer.getPlayer();
    if (window.webkitAudioContext === undefined) {
      error("Sorry, this app needs advanced web audio. Your browser doesn't support it. Try the latest version of Chrome");
    } 
    else {
      tracks = [];
      remixAllTheTracks(trackIDs.length);
    }
  }


  function remixAllTheTracks(num){
    if (num<1){
      console.log('base case');
      console.log(tracks);
      var beats = [];
      var durations = [];
      for (i=0;i<tracks.length;i++) {
        var beatArray = tracks[i].analysis.bars;
        for (j=0;j<beatArray.length;j++) {
          beats.push(beatArray[j]);
          durations.push(beatArray[j].duration);
        }
      }
      console.log(durations.length);
      renderRing(durations);
    }
    else{
      remixer.remixTrackById(trackIDs[num-1], trackURL, function(t, percent){
        track = t;

        $("#info").text(percent + "% of Track "+(trackIDs.length-num)+"loaded");
        if (percent == 100) {
          $("#info").text(percent + "% of the track loaded, remixing...");
        }

        if (track.status == 'ok') {
          $("#bars").text("The track has " + track.analysis.bars.length + " bars");
          $("#beats").text("The track has " + track.analysis.beats.length + " beats");
          $("#info").text("Remix complete!");
          tracks.push(track);
          console.log(track);
          remixAllTheTracks(num-1);
        }
      });
    }
  }


  window.onload = init;
  setInterval(updateName, 100)
});

function updateName () {
  $("#song-title").text('Song!')
}

