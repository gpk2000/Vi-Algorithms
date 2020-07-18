// some global vars
let values = [];
let cols = [];
let loops = 1;
let colors = ['rgb(255, 0, 0)', 'rgb(255, 127, 0)', 'rgb(255, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)', 'rgb(46, 43, 95)', 'rgb(139, 0, 255)'];
let start = false;
var temp = [];

// setting up the canvas
function setup() {
	start = false;
	loops = 1;
	createCanvas(windowWidth, windowHeight);
	values = new Array(256);
	cols = new Array(256);
	temp = new Array(256);
	for(var i = 0; i < values.length; i++){
		values[i] = i * 2;
		cols[i] = colors[floor(random(0, 7))];
	}
	shuffleArr(values);
	run_button = createButton('Run Merge-Sort');
	reset_button = createButton('Reset');
	slider = createSlider(1, 20, 2, 4);
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
	run_button.mousePressed(merge_sort);
	if(loops < values.length){
		if(start){
			merge_sort();
			loops *= 2;
		}
	}else{
		console.log("completed");
	}
	for(var i = 0; i < values.length; i++){
		stroke(255);
		fill(cols[i]);
		rect(i * 5.3, height - values[i], 5.3, height);
	}

}

// merge sort helper function
function merge_sort(){
	if(loops >= values.length)return;
	start = true;
	for(var i = 0; i < values.length - 1; i += 2 * loops){
		var mid = min(i + loops - 1, values.length - 1);
		var right = min(i + 2 * loops - 1, values.length - 1);
		merge(i, mid, right); 
	}
	
}
// merge functions to merge parts Geeks for Geeks help
function merge(l, m, r){
	var i, j, k;
	var n1 = m - l + 1;
	var n2 = r - m;
	var L = new Array(n1), R = new Array(n2);
	for (i = 0; i < n1; i++){
		L[i] = values[l + i]; 
	}
	for (j = 0; j < n2; j++){
		R[j] = values[m + 1+ j];
	}
	i = 0; j = 0; k = l;
	while (i < n1 && j < n2){ 
        if (L[i] <= R[j]){ 
            values[k] = L[i]; 
            i++; 
        } 
        else{ 
            values[k] = R[j]; 
            j++; 
        } 
        k++; 
    }
    while (i < n1){ 
        values[k] = L[i]; 
        i++; 
        k++; 
    } 
    while (j < n2){ 
        values[k] = R[j]; 
        j++; 
        k++; 
    }  
}

// reset the canvas and start again
function reset_and_start(){
	clear();
	start = false;
	loops = 1;
	createCanvas(windowWidth, windowHeight);
	values = new Array(256);
	cols = new Array(256);
	for(var i = 0; i < values.length; i++){
		values[i] = i * 2;
		cols[i] = colors[floor(random(0, 7))];
	}
	shuffleArr(values);
}
