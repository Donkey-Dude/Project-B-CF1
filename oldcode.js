//Image Fractalize Tool
//Oliver Nickerson
//This project converts any uploaded image to an abstracted geometric version. It uses multiple nested for loops to access every pixel's grayscale value and creates averages over a specified range to then create the corresponding geometric shape. Besides upload functionality, the user can also download the created image. The UI primarily rests on button objects which create arrays. This allows the user to type in the exact values they want, even using backspace if needed. Efforts were made to make the UI barebones, but satisfyingly functional. There are also user friendly additions such as the automatic ratio button which preserves the original image sizing. The fractalizing process can sometimes take a while, especially at large scale, but the code itself is simplified as much as possible.
//pixel size has a minimum of 3

let img;
let grab;
let rollingsum = 0;
let resox;
let resoy;
let pixsize;
let done = 2;
let input;

function setup() {
//creates objects and triggers the UI setup
  createCanvas(windowWidth, windowHeight);
  reso1 = new numBox(50,75);
  reso2 = new numBox(175,75);
  pixs = new numBox(350,75);
  menu();
}

function mousePressed() {
//activates all object/function click triggers
if(done === 1){
//waits for a second click after displaying the image to convert
fractalize();
}
reso1.clicked();
reso2.clicked();
pixs.clicked();
convertClicked();
lockClicked();
}

function draw(){
//runs all continuous object and button functions
reso1.blink();
reso2.blink();
pixs.blink();
buttonBlink(325,475,175,225,'Convert');
buttonBlink(175,275,300,350,'Lock');
if(img && done === 0){
ratioUpdate();
}
}

function keyPressed(){
//triggers all type functions as well as escape and enter functions
reso1.typing();
reso2.typing();
pixs.typing();
if(keyCode === 27){
//escapes to the menu from the image view
menu();
}
if(keyCode === 13 && done === 2){
//saves fractalized creation to the computer
saveCanvas('fractalized');
}
}

function menu(){
//creates the layout of the UI for the tool and resets all settings
//is activated both upon set up and upon pressing the escape key
  resizeCanvas(windowWidth,windowHeight);
  //creates file upload point
  if(done === 2){
  input = createFileInput(handleFile);
  input.position(30, 180);
  }
  //resets variables
  done = 0;
  reso1.value = [];
  reso2.value = [];
  pixs.value = [];
  //creates text and boxes
  textAlign(CENTER,CENTER);
  background(255);
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(25,25,275,125);
  rect(25,175,275,50);
  rect(325,25,150,125);
  rect(325,175,150,50);
  rect(25,250,275,125);
  rect(50,300,100,50);
  rect(175,300,100,50);
  rect(325,250,150,300);
  fill(0);
  textSize(28);
  text('Resolution',162.5,50);
  text('Ratio',162.5,275);
  text('Pixel Size',400,50);
  text('Convert',400,200);
  text('Lock',225,325);
  //info column
  text('Info',400,275);
  textSize(12);
  textAlign(LEFT);
  text('Upload an image to begin',330,300);
  text('Ratio shows the original',330,320);
  text('sizing',330,335);
  text('Click and type to set new',330,355);
  text('resolution or enter width',330,370);
  text('and click lock to preserve',330,385);
  text('the original ratio',330,400);
  text('Use pixel size to set the',330,420);
  text('size of the geometric',330,435);
  text('shapes',330,450);
  text('Click convert to load the',330,470);
  text('uploaded image and click',330,485);
  text('again to convert',330,500);
  text('ESC to return here',330,520);
  text('ENTER to save',330,535);
  //logo
  textSize(22);
  text('Oliver',180,510)
  text('Nickerson',180,530)
  textSize(28);
  text('Image',180,425);
  text('Fractalize',180,450)
  text('Tool',180,475)
  textAlign(CENTER);
  noStroke();
  rect(25,400,75,75);
  rect(100,400,75,75);
  rect(25,475,75,75);
  rect(100,475,75,75);
  fill(255);
  rect(30,405,65,65);
  rect(105,405,65,65);
  rect(30,480,65,65);
  strokeWeight(5);
  stroke(0);
  line(137.5,405,137.5,470);
  line(62.5,480,62.5,545);
  line(30,512.5,95,512.5);
  //makes objects appear
  reso1.clicked();
  reso2.clicked();
  pixs.clicked();
}

function handleFile(file) {
//allows images to be uploaded from the computer and saves them to the image variable
  if(file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  }else {
    img = null;
  }
}

class numBox {
//number entry boxes for the resolution and pixel size inputs
  constructor(x,y){
this.x = x;
this.y = y;
this.value = []
stroke(1);
fill(255);
rect(x,y,100,50);
  }
clicked(){
//updates click status to allow for typing and blinking
if(done === 0){
if(mouseX >= this.x && mouseX <= this.x+100 && mouseY >= this.y && mouseY <= this.y+50){
fill(235);
this.type = 1;
} else {
fill(255);
this.type = 0;
}
strokeWeight(1);
stroke(0);
rect(this.x,this.y,100,50);  
fill(0);
text(this.value.join(''),this.x+50,this.y+25);
}
}
blink(){
//makes the cursor blink when the box is selected
if(this.type ===1){
strokeWeight(1);
stroke(0);
if(frameCount % 40 === 0){
line(this.x+50,this.y,this.x+50,this.y+50);
}else if(frameCount % 40 === 20){
fill(235);
rect(this.x,this.y,100,50);
fill(0);
text(this.value.join(''),this.x+50,this.y+25);
}
}
}
typing(){
//allows the user to type in the boxes when selected
//uses arrays to store values
if(this.type ===1){
if(keyCode >= 48 && keyCode <= 57){
this.value.push(key);
}else if(keyCode === 8){
this.value.pop();
}
fill(235);
rect(this.x,this.y,100,50);
fill(0);
text(this.value.join(''),this.x+50,this.y+25);
}
}
}

function buttonBlink(x1,x2,y1,y2,tex){
//makes the buttons highlight when hovered over
if (done === 0){
if(mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2){
fill(235);
}else{
fill(255);
}
rect(x1,y1,x2-x1,y2-y1);
fill(0);
text(tex,(x2+x1)/2,(y2+y1)/2);
}
}

function ratioUpdate(){
//tells the user the ratio of the uploaded image
  fill(255);
  stroke(0);
  strokeWeight(1);
  rect(50,300,100,50);
  fill(0);
  text(round(img.width/img.height,3),100,325);
}

function convertClicked(){
//loads the image to prepare for conversion
if(mouseX >= 325 && mouseX <= 500 && mouseY >= 175 && mouseY <= 225 && done === 0 && img && reso1.value.join('') >= 3 && reso2.value.join('') >= 3 && pixs.value.join('') >=3){
//plusses are a shortcut to signify an integer instead of a string
resox = +reso1.value.join('');
resoy = +reso2.value.join('');
pixsize = +pixs.value.join('');
resizeCanvas(resox,resoy);
background(255);
done = 1;
input.hide();
image(img,0,0,resox,resoy);
}
}

function lockClicked(){
//automatically sets the image height to the ratio of the original file
//a width must be entered first for this to work!
if(mouseX >= 175 && mouseX <= 275 && mouseY >= 300 && mouseY <= 350 && done === 0){
reso2.value = [round(reso1.value.join('')/round(img.width/img.height,3))]
fill(255);
rect(175,75,100,50);
fill(0);
text(reso2.value.join(''),225,100);
}
}

function fractalize() {
//converts the uploaded image to geometric art by creating an average of the grayscale value of the pixels and replacing those with appropriate geometric shapes
filter(GRAY);
loadPixels();
done = 2;
  for (let w = 0; w < resox; w += pixsize) {
    for (let h = 0; h < resoy; h += pixsize) {
      for (let x = 0; x < pixsize; x++){
        for(let y = 0; y < pixsize; y++){
          grab = get(w+x, h+y);
          rollingsum = rollingsum + grab[1];
        }
      }
avg = rollingsum / (pixsize * pixsize)
if(avg > 200){
noStroke();
fill(255);
rect(w,h,pixsize,pixsize);
}else if(avg > 150 && avg <= 200){
noStroke();
fill(0);
rect(w,h,pixsize,pixsize);
fill(255);
stroke(255);
strokeWeight(1);
rect(w+1,h+1,pixsize-2,pixsize-2);
}else if(avg > 100 && avg <= 150){
noStroke();
fill(0);
rect(w,h,pixsize,pixsize);
fill(255);
stroke(255);
strokeWeight(1);
rect(w+1,h+1,pixsize-2,pixsize-2);
stroke(0);
line(w+pixsize/2,h+0.5,w+pixsize/2,h+pixsize-0.5);
}else if(avg > 50 && avg <= 100){
noStroke();
fill(0);
rect(w,h,pixsize,pixsize);
fill(255);
stroke(255);
strokeWeight(1);
rect(w+1,h+1,pixsize-2,pixsize-2);
stroke(0);
line(w+pixsize/2,h+0.5,w+pixsize/2,h+pixsize-0.5);
line(w+0.5,h+pixsize/2,w+pixsize-0.5,h+pixsize/2);
}else if(avg <= 50){
noStroke();
fill(0);
rect(w,h,pixsize,pixsize);
}
rollingsum = 0;
    }
  }
}