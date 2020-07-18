// some global variables
let values = [];
let cols = [];
let loops = 1;
let colors = ['rgb(255, 0, 0)', 'rgb(255, 127, 0)', 'rgb(255, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(46, 43, 95)', 'rgb(139, 0, 255)'];
let start = false;

// setting up the canvas
function setup() {
	start = false;
	loops = 1;
	createCanvas(windowWidth, windowHeight);
	values = new Array(floor(windowWidth / 8));
	cols = new Array(49);
	for(var i = 0; i < values.length; i++){
		values[i] = i * 4;
		cols[i] = colors[floor(random(0, 7))];
	}
	shuffleArr(values);
	run_button = createButton('Run Insertion-Sort');
	reset_button = createButton('Reset');
	slider = createSlider(0, 120, 10, 10);
	slider.position(130, 0);
	slider.style('width', '80px');
	run_button.position(0, 0);
	reset_button.position(0, 20);
	reset_button.mousePressed(reset_and_start);

}

// shuffling an array found at https://stackoverflow.com/a/12646864/10590233 Thanks!
function shuffleArr (array){
	for (var i = array.length - 1; i > 0; i--) {
		var rand = Math.floor(Math.random() * (i + 1));
		[array[i], array[rand]] = [array[rand], array[i]]
	}
}

// real drawing starts here
function draw() {
	console.log(loops);
	let val = slider.value();
	frameRate(val);
	background(51);
	run_button.mousePressed(insertion_sort);
	if(loops < values.length){
		if(start){
			insertion_sort();
			loops++;
		}
	}else{
		console.log("completed");
	}
	for(var i = 0; i < values.length; i++){
		stroke(255);
		fill(cols[i]);
		rect(i * 8, height - values[i], 8, height);
	}

}

// the actual algorithm
function insertion_sort(){
	if(loops >= values.length)return;
	start = true;
	var key = values[loops];
	var j = loops - 1;
	while(j >= 0 && values[j] > key){
		values[j + 1] = values[j];
		j--;
	}
	values[j + 1] = key;
}

// swap utility function
function swap(arr, a, b){
	var z = arr[a];
	arr[a] = arr[b];
	arr[b] = z;
}

// reset the canvas and start again
function reset_and_start(){
	clear();
	start = false;
	loops = 0;
	createCanvas(windowWidth, windowHeight);
	values = new Array(floor(windowWidth / 8));
	cols = new Array(49);
	for(var i = 0; i < values.length; i++){
		values[i] = i * 4;
		cols[i] = colors[floor(random(0, 7))];
	}
	shuffleArr(values);
}
