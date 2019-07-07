var song;
var buttonPlay;
var buttonPause;
var volSlider;
var hueSlider;
var satSlider;
var amp;
var fft;

function setup() {
  //CREATING BLACK CANVAS FOR VISUALIZATION
  var cnv = createCanvas(750, 750);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  //LOADING SONG
  song = loadSound("mind.mp3", loaded);

  //SETTING AMPLITUDE AND FFT VARIABLES
  amp = new p5.Amplitude(0.9);
  fft = new p5.FFT(0.9, 256);

  //SETTING VOLUME SLIDER, USED FOR BRIGHTNESS
  volSlider = createSlider(0, 1, 1, 0.1);
  volSlider.position(150, 200)

  //SETTING HUE SLIDER
  hueSlider = createSlider(0, 360, 0, 1);
  hueSlider.position(150, 250)

  //SETTING SATURATION SLIDER
  satSlider = createSlider(0, 100, 100, 1);
  satSlider.position(150, 300);
  background(0);
}

function loaded() {
  //PLAYING THE SONG
  buttonPlay = createButton("play");
  buttonPause = createButton("pause");

  //PLAY BUTTON
  var buttonWidth = (windowWidth/2)-60;

  //POSITION AND FUNCTION TO CHANGE LABEL
  buttonPlay.position(buttonWidth, 5)
  buttonPlay.mousePressed(togglePlaying);
  buttonPause.position(buttonWidth+50, 5)
  buttonPause.mousePressed(togglePause);
}

function draw() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  background(0);

  //SETTING VOLUME TO MAPPING
  var max_r = volSlider.value();
  song.setVolume(max_r);
  
  //GETTING LEVEL/VOLUME TO THE ELLIPSE
  var vol = amp.getLevel();
  var diameter = map(vol, 0, max_r, 100, 700);

  var spectrum = fft.analyze();

  //MAPPING THE BRIGHTNESS THROUGH THE VOLUME AND THE HUE THROUGH USER INTERACTION
  var bright = map(vol, 0, max_r, 0, 100);
  var hue = hueSlider.value();
  var saturation = satSlider.value();

  console.log(bright);
  console.log(hue);
  console.log(saturation);
  //HSB COLOR MODE
  colorMode(HSB);

  //THE ELLIPSE DRAW
  fill((1*hue), (1*saturation), (1*bright));
  ellipse(width/2, height/2, diameter, diameter);
}


function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    buttonPlay.html("stop");
  } else {
    song.stop();
    buttonPlay.html("play");
  }
}

function togglePause() {
  if (!song.isPlaying()) {
    song.play();
    buttonPause.html("pause");
  } else {
    song.pause();
    buttonPause.html("play");
  }
}