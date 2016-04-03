(function(window){

var beat;
var speech;
var rap;

function makeSpeech(){
  var speech = {};
  speech.start = new SpeechSynthesisUtterance('start');
  speech.beat = [
    new SpeechSynthesisUtterance('one'),
    new SpeechSynthesisUtterance('two'),
    new SpeechSynthesisUtterance('three'),
    new SpeechSynthesisUtterance('four')
  ];
  return speech;
}

function BPMtoMillis(bpm){
  return 60000 / bpm;
}

function beat(){
  var b = speech.beat[beat.count%4];
  b.rate = 1;
  window.speechSynthesis.speak(b);
  beat.count++;
}

function rap(){
  rapText = document.getElementById("rap").value;
  rapSpeech = new SpeechSynthesisUtterance(rapText);
  rapSpeech.rate = 1.1;
  rapSpeech.pitch = 2;
  window.speechSynthesis.speak(rapSpeech);
}

function start(){
  //rap();
  //window.speechSynthesis.speak(speech.start);
  //beat.count = 0;
  //beat.interval = setInterval(beat, BPMtoMillis(100));

  //create one of Tone's built-in synthesizers and connect it to the master output
  var synth = new Tone.SimpleSynth().toMaster();

  //play a note every quarter-note
  var loop = new Tone.Loop(function(time){
      synth.triggerAttackRelease("C2", "8n", time);
  }, "4n");

  //loop between the first and fourth measures of the Transport's timeline
  loop.start("1m").stop("4m");

  Tone.Transport.start();
}

function stop(){
  //start the transport
  Tone.Transport.stop();
}

function main(){
  // initialize
  speech = makeSpeech();

  // attach event handlers
  document.getElementById("start").addEventListener("click", start);
  document.getElementById("stop").addEventListener("click", stop);
}

main();

})(window);

