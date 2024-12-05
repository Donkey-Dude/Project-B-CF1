let tempoVar = 120;
let nLength = 60;
// Melody Object for C Major
let melody = {
  name: 'C Major Scale',
// This index determines what notes get played and in what order. Each is associated with a frequency in the frequencies array.
  notesIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  tempo: tempoVar
};

// Calculate duration of each note in seconds.
let noteDuration = nLength / melody.tempo;

// Variable for frequency (middle C).
let myFreq = 262;

// Array of frequencies in C Major.
let frequencies = [
  myFreq * 0.9,
  myFreq,
  (myFreq * 9) / 8,
  (myFreq * 5) / 4,
  (myFreq * 4) / 3,
  (myFreq * 3) / 2,
  (myFreq * 5) / 3,
  (myFreq * 15) / 8,
  myFreq * 2,
  myFreq * 2.2,
];
// Empty array for oscillator objects.
let oscillators = [];

function setup() {
  // Initialize oscillators and place in oscillators array.
  for (let freq of frequencies) {
    osc = new p5.Oscillator(freq);
    osc.setType('sawtooth');
    oscillators.push(osc);
  }
}

function draw() {
  background(220);
}

// Starts playing the note.
function playNote(n) {
  // Starts oscillator if needed.
if (oscillators[n].started === false) {
  oscillators[n].start();
  // Starts playing the note by increasing the volume with a 0.01 sec fade-in.
    oscillators[n].amp(1, 0.01);
  }
  // Stops playing the note after number of seconds stored in noteDuration
setTimeout(stopNote, noteDuration * 1000, n);
}

// Stops playing the note.
function stopNote(n) {
  // Lower oscillator volume to 0.
  oscillators[n].amp(0, 0.01);
  
  // Stop the oscillator.
  oscillators[n].stop();
}

// Plays the notes in a melody.
function play() {
  // Read each [index, note] in melody.notesIndex
  for (let [index, note] of melody.notesIndex.entries()) {
    // Play each note at scheduled time
    setTimeout(playNote, noteDuration * 1000 * index, note);
  }
}

//play melody with mouse click
function mousePressed() {
play();
}