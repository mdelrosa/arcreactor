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
    if (window.webkitAudioContext === undefined) {
      error("Sorry, this app needs advanced web audio. Your browser doesn't support it. Try the latest version of Chrome");
    } 
    else {
      var tracks = [];
      for (i=0; i<trackIDs.length; i++) {
        var context = new webkitAudioContext();
        remixer = createJRemixer(context, $, apiKey);
        player = remixer.getPlayer();
        $("#info").text("Loading analysis data...");

        remixer.remixTrackById(trackIDs[i], trackURL, function(t, percent) {
          track = t;

          $("#info").text(percent + "% of Track "+i+"loaded");
          if (percent == 100) {
            $("#info").text(percent + "% of the track loaded, remixing...");
          }

          if (track.status == 'ok') {
            $("#bars").text("The track has " + track.analysis.bars.length + " bars");
            $("#beats").text("The track has " + track.analysis.beats.length + " beats");
            $("#info").text("Remix complete!");
            tracks.push(track);
            console.log(track);
          }
        });
      }
      console.log(tracks)
    }
  }

  window.onload = init;
  setInterval(updateName, 100)
});

function updateName () {
  $("#song-title").text('Song!')
}
