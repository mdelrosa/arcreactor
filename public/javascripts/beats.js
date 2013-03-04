// Add beats or bars of a track to a live queue.
// You will need to supply your Echo Nest API key, the trackID, and a URL to the track.
// The supplied track can be found in the audio subdirectory.
  

$(document).ready(function() {
  var apiKey = 'VZC2UXVOYIIFGURRH';
  var trackID = 'SOSOCSP13AAD11E0A6';
  var trackURL = 'media/codemonkey.mp3'

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
    if (window.webkitAudioContext === undefined) {
      error("Sorry, this app needs advanced web audio. Your browser doesn't support it. Try the latest version of Chrome");
    } 
    else {
      var context = new webkitAudioContext();
      remixer = createJRemixer(context, $, apiKey);
      player = remixer.getPlayer();
      $("#info").text("Loading analysis data...");

      remixer.remixTrackById(trackID, trackURL, function(t, percent) {
        track = t;

        $("#info").text(percent + "% of the track loaded");
        if (percent == 100) {
          $("#info").text(percent + "% of the track loaded, remixing...");
        }

        if (track.status == 'ok') {
          $("#bars").text("The track has " + track.analysis.bars.length + " bars");
          $("#beats").text("The track has " + track.analysis.beats.length + " beats");
          $("#info").text("Remix complete!");
          console.log(track);
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