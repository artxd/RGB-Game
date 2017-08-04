var colors = document.querySelectorAll(".color");
var rgb = document.querySelector("#color");
var minus = document.querySelector("#minus > span");
var plus = document.querySelector("#plus > span");
var accuracy = document.querySelector("#accuracy > span");
var m = 0;
var p = 0;
var a = 0;

addColorsAndBorders(colors);
chooseRandomColorToQuess(colors);
addEvents(colors);
calculateAccuracy();

function calculateAccuracy() {
	if(p === 0) {
		a = 0;
	} else {
		a = Math.round(((p/(p+m))*100) * 10) / 10;
	}
	accuracy.innerHTML = a;
}

function addEvents(array) {
	for(var i = 0, length1 = array.length; i < length1; i++){
		addListeners(array[i]);
	}
}

function addListeners(element) {
	element.addEventListener("mouseover", function (e) {
		e.target.style.boxShadow = "0 0 4em " + e.target.style.backgroundColor;}, false);
	element.addEventListener("mouseout", function (e) { 
		e.target.style.boxShadow = "none";}, false);
	element.addEventListener("click", function (e) {
		var x = rgb.innerHTML
		var y = "RGB"+e.target.style.backgroundColor.slice(3);
		if (x !== y) {
			e.target.classList.add("shake");
			m ++;
			minus.innerHTML = m;
		} else {
			p ++;
			plus.innerHTML = p;
			addColorsAndBorders(colors);
			chooseRandomColorToQuess(colors);
			e.target.style.boxShadow = "0 0 4em " + e.target.style.backgroundColor;
		}
		calculateAccuracy();
	}, false);
	element.addEventListener("animationend", function (e) {
		e.target.classList.remove("shake"); }, false);
}

function chooseRandomColorToQuess(array) {
	var randomNumber = generateRandomNumber(0, colors.length-1);
	rgb.innerHTML = "RGB"+array[randomNumber].style.backgroundColor.slice(3);
}

function addColorsAndBorders(array) {
	for(var i = 0, length1 = array.length; i < length1; i++){
		array[i].style.backgroundColor = String(generateRandomColor());
		array[i].style.borderRadius = String(generateBorders());
	}
}

function generateRandomColor() {
	randomColor = "rgb(" + generateRandomNumber(0,255) + 
	"," + generateRandomNumber(0,255) + 
	"," + generateRandomNumber(0,255) + ")";
	return randomColor;
}
function generateBorders() {
	randomBorders = generateRandomNumber(48,60) + 
	"% " + generateRandomNumber(48,60) + 
	"% " + generateRandomNumber(48,60) + "% "
	+ generateRandomNumber(48,60) + "%";
	return randomBorders;
}

function generateRandomNumber(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}


