//import * as fn from './functions.js'


// Tau de rafraichissement
const tauxR = 0.8;

let launchModel = false

// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/yt5Cev9D/';
  
// video
let video;
let flippedVideo;
// To store the classification
let classifier;
let res;
let label = '';

// audio
let stopAudio = true

// programme
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let signe = '';
let start = false;
let index = -1;
let fin   = -1;  
const tagSign = document.getElementById("p1")



// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  //classifier = ml5.imageClassifier('../model/model2/model.json');
}

function setup() {
  frameRate(tauxR)
  let w = 640; let h = 400;
  //createCanvas(640, 520);
  createCanvas(w, h).parent("container-camera");
  // Create the video
  video = createCapture(VIDEO);
  video.size(w, h);
  //circle(320, 240, 20);
  video.hide();
  flippedVideo = ml5.flipImage(video)
  // Start classifying
  //classifyVideo();
  say('Bonjour');
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);
  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  //text(label, width / 2, height - 4);

  console.warn(start)
  classifyVideo();
  if(start){
    SignIsCorrect();
  } 
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  res = results[0];          // ex: Object { label: "N", confidence: 0.3161904513835907 }
  console.log(res)
  label = res.label;
  // Classifiy again!
}

// ==================================================================================

// Configuration de SpeechSynthesisUtterance
function say(texte){
    const msg = new SpeechSynthesisUtterance();
    const voices = window.speechSynthesis.getVoices();
    msg.volume = 1;
    //msg.rate = 1; // From 0.1 to 10
    //msg.pitch = 2;
    msg.lang = 'fr-ca';
    //msg.voice = voices[3];
    msg.text = texte;
    speechSynthesis.speak(msg);
}

function programme1(){
  start = true;
  say('programme 1');
  index = 0; fin = index +2
  doSign()
}

function programme2(){
  say('programme 2');
  index = 3; fin = index +2
  doSign()
}

function doSign(){
  say('Fait la lettre');
  signe = alphabet[index]
  tagSign.innerHTML = signe
  say(signe);
  start = true
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function SignIsCorrect(){
  if(index < fin){
    if(res.label === signe && res.confidence > 0.75){
      say("Bravo");
      index++
      doSign()
    }
  } else{
    start = false
    say("Tu as terminé le programme")
    tagSign.innerHTML = "Tu as terminé le programme"
   }
}

function launchTP(idTP) {
  switch (idTP) {
    case 1: programme1(); 
      // arrêter la camera et la detection
      break;
    case 2: programme2(); break;
    default:
  }
}

