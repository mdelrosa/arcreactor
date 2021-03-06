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


  // create html to add the song names to mash.jade
  function getNewHTML(srcs, tracks) {
    var titles = [];
    var newHTML = '<div class="audioMain">';    
    for (i=0;i<tracks.length;i++) {
      titles.push(tracks[i].title)
      newHTML += '<p name='+srcs[i]+'> '+tracks[i].title+'</p><audio id='+tracks[i].title+' src='+srcs[i]+'></audio>';
    }
    newHTML += '</div>';
    console.log('newHTML', newHTML);
    // we need to push the initial audio source onto the jade; do that here
    $('.audioMain').append(newHTML)
    $('audio')[0].play();
    //start up switcher
    fireInterval();
    return newHTML;
  }

  //some sweet recursive nonsense that gets the track info insync
  function remixAllTheTracks(num){
    if (num<1){
      //base case
      //ship up the bars/their durations
      var bars = [];
      var durations = [];
      for (i=0;i<tracks.length;i++) {
        var barArray = tracks[i].analysis.bars;
        for (j=0;j<barArray.length;j++) {
          bars.push(barArray[j]);
          durations.push(barArray[j].duration);
        }
      }
      console.log('bars', bars);
      //sketchily set a metric fuckton of global variables
      window.bars = bars;
      window.durations = durations;
      window.tracks = tracks;
      window.trackNames = [];
      for (i=0;i<tracks.length;i++) {
        window.trackNames.push(tracks[i].title);
      }
      // console.log('trackNames: init', window.trackNames)
      window.currentIndex = 0;
      window.switchDuration = 10;
      window.nextSwitchIn = 5;
      //render ring based on duration of each bar
      renderRing(durations);
      // get track titles/sources, append them to target div
      var srcs = $('.links').attr('name').split(',');
      var newHTML = getNewHTML(srcs, tracks.reverse());
      // $('body').append('<script src="/javascripts/switch.js" />');
    }
    else{
      remixer.remixTrackById(trackIDs[num-1], trackURL, function(t, percent){
        track = t;

        // $("#info").text(percent + "% of Track "+(trackIDs.length-num)+"loaded");
        if (percent == 100) {
          // $("#info").text(percent + "% of the track loaded, remixing...");
        }

        if (track.status == 'ok') {
          // $("#bars").text("The track has " + track.analysis.bars.length + " bars");
          // $("#beats").text("The track has " + track.analysis.beats.length + " beats");
          // $("#info").text("Remix complete!");
          console.log(track)
          tracks.push(track);
          remixAllTheTracks(num-1);
        }
      });
    }
  }

  window.onload = init;

  function updateName () {
    if (window.tracks === undefined) {
      $("#song-title").text('Loading Mashup...')
    }
    else {
      $("#song-title").text(window.tracks[1-window.currentIndex].title)
    }
  }

  setInterval(updateName, 100)

  //some dummy code that will handle analyzing/switching between bars
  var switchSongs = function() {
    var audio = $('.audioMain'),
        currentTime = $('audio')[0].currentTime,
        bars = window.bars,
        timeCheck = 0,
        i = 0,
        trueI = 0,
        delta = 5;
    var trackNames = [];
    for (i=0;i<window.tracks.length;i++) {
      trackNames.push(window.tracks[i].title);
    }
    console.log('newTracksNames', trackNames);
    while (timeCheck <= currentTime && i < window.bars.length) {
      if (bars[i].track.title === window.tracks[window.currentIndex].title) {
        timeCheck += parseInt(bars[i].duration);
        trueI += 1;
      }
      i+=1
    }
    // console.log('absolute index', i)
    window.nextSwitchIn -= 1;
    console.log(nextSwitchIn);
    if (window.nextSwitchIn <= 0) {
      for (j=0;j<=bars.length;j++) {
        if (!(bars[j].track.title === window.tracks[window.currentIndex].title) && (Math.floor(2*Math.random()))) {
          // console.log('checkTitle', bars[j].track.title)
          // console.log('currentTitle', window.tracks[window.currentIndex].title)
          var currentTimbre = 0,
              checkTimbre = 0;
          for (k=0;k<12;k++) {
            currentTimbre += parseInt(bars[i].oseg.timbre[k])/12;
            checkTimbre += parseInt(bars[j].oseg.timbre[k])/12;
          }
          if (checkTimbre>(currentTimbre-delta) && checkTimbre<(currentTimbre+delta)) {
            var pauseThis = document.getElementById(window.trackNames[window.currentIndex].split(' ')[0]);
            pauseThis.pause();
            
            window.currentIndex = trackNames.indexOf(bars[j].track.title);
            console.log('currentTrackTitle', bars[j].track.title)
            console.log('trackNames', trackNames);
            console.log('currentIndex', window.currentIndex)
            // $('#audioMain').attr('src', $('p:contains('+bars[j].track.title+')').attr('name'));
            var timeChanger = document.getElementById(window.trackNames[window.currentIndex].split(' ')[0]);
            timeChanger.play();
            // console.log('before', $('#audioMain').attr('currentTime'));
            console.log('audioElement', timeChanger)
            console.log(bars[j].start);
            console.log(timeChanger.currentTime);
            timeChanger.currentTime = parseInt(bars[j].start);
            // $('#audioMain').attr('currentTime', bars[j].start);
            // console.log('after', $('#audioMain').attr('currentTime'));
            window.nextSwitchIn = window.switchDuration;
            break;
          }
        }
      }
    }
    $('currentBar').text('Bar '+i);
  }

  var fireInterval = function() {
    setInterval(switchSongs, 1000)
  }

});



