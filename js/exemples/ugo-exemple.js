let shapeClassifier;
let CouleurClassifier;
let canvas;
let resultsDiv;
let resultsDivCoul;
let clearButton;
let video;


function setup() {
  canvas=createCanvas(400, 400);
  video=createCapture(VIDEO);
  video.size(64,64);
  pixelDensity(1)
  let options={
    inputs:[64,64,4],
    task: "imageClassification",
};
  shapeClassifier = ml5.neuralNetwork(options);
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  }

  CouleurClassifier = ml5.neuralNetwork(options);
  const modelDetailsCoul={
    model:'modelV2/model.json',
    metadata :'modelV2/model_meta.json',
    weights:'modelV2/model.weights.bin',
  }

  background(255);
  // clearButton = createButton('Effacer')
  // clearButton.mousePressed(function(){
  //   background(255);
  // });
  resultsDiv=createDiv('chargement du modèle');
  resultsDivCoul=createDiv();
  shapeClassifier.load(modelDetails, modelLoaded);
  CouleurClassifier.load(modelDetailsCoul,modelLoaded);

}

function modelLoaded(){
  console.log("modèle prêt")
  keyPressed();
}

function keyPressed(){
  // inputImage.copy(canvas,0,0,400,400,0,0,64,64);
  // image(inputImage,0,0);
  shapeClassifier.classify({image:video},gotResults);
  CouleurClassifier.classify({image:video},gotResultsCoul);
}

function gotResults(err, results){
  if(err) {
    console.error(err);
    return;
  }
  let label=results[0].label;
  let confidence=nf(100*results[0].confidence,2,0 );
  resultsDiv.html(`${label} ${confidence}%`)
  // console.log(results);
  
}

function gotResultsCoul(err, results){
  if(err) {
    console.error(err);
    return;
  }
  let label=results[0].label;
  let confidence=nf(100*results[0].confidence,2,0 );
  resultsDivCoul.html(`${label} ${confidence}%`)
  // console.log(results);

}

function draw() {
  image(video,0,0,width,height);
  // if (mouseIsPressed) {
  //   strokeWeight(4)
  //   line(mouseX,mouseY,pmouseX,pmouseY);
    
  // }

  // stroke(0);
  // strokeWeight(4);
  // noFill();
  // rectMode(CENTER);
  // rect(width/2,height/2,40);
  // circle(width/2,height/2,40);
}
