// function say(texte){
//     const msg = new SpeechSynthesisUtterance();
//     const voices = window.speechSynthesis.getVoices();
//     msg.volume = 3;
//     msg.rate = 1; // From 0.1 to 10
//     msg.pitch = 2;
//     msg.lang = 'de-DE';
//     msg.voice = voices[1];
//     msg.text = texte;
//     speechSynthesis.speak(msg);
// }

// for (let i = 0; i < 3; i++) { 
//     say("nein")
// }



let video;

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
}

function draw() {
  background(0);
  image(video, 0, 0, 320, 270);
}

