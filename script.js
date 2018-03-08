function shuffleArray(array){
	let currentIndex = array.length,
	tempVal,
	randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		tempVal = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex]= tempVal;
	}
	return array;
}


function rollDie(dice) {
	let result = [];
	for (let i = 0; i < dice.length; i++) {
		let min = 0,
		max = dice[i].maxSides - 1,
		nbrSide = dice[i].nbrSide;
		shuffleArray(nbrSide);
		let siderolled = Math.floor(Math.random() * (max - min + 1)) + min;
		let rolled = dice[i].nbrSide[siderolled]
		let temp = {maxSides:max, rolled:rolled};
		result.push(temp);
	}
	console.log(result);
	return result;
}

function showDiceRolled() {
	let myRoll =rollDie(dice),
	x = "",
	y = "";
	for (let i = 0;i < myRoll.length;i++) {
		x += myRoll[i].maxSides+",";
	}
	for (let i = 0;i < myRoll.length;i++) {
		y += myRoll[i].rolled+",";
		let tag= "dice_" + (i+1)
		document.getElementById(tag).src=getImage(myRoll[i].rolled);
	}
	console.log("x = " + x +"y = " + y);
	return y;
}

function getImage(rolledNbr) {
	let imgToSwap ="";
	if (rolledNbr > 0){
		switch(rolledNbr){
			case(1):
			imgToSwap = "images/one.jpg";
			break;
			case(2):
			imgToSwap = "images/two.jpg";
			break;
			case(3):
			imgToSwap = "images/three.jpg";
			break;
			case(4):
			imgToSwap = "images/four.jpg";
			break;
			case(5):
			imgToSwap = "images/five.jpg";
			break;
			case(6):
			imgToSwap = "images/six.jpg";
			break;
		}
	}
	return imgToSwap;
}

function selectDie(tag) {
	
	let t = document.getElementById(tag).src.replace(/^.*(\\|\/|\:)/, '');
	if (t.search(/^black*/) === 0){
		document.getElementById(tag).src="images/"+t;
	} else {
		document.getElementById(tag).src="images/black-"+t;
	}
	console.log(t);
}

function unSelectDie(tag) {
	let t = document.getElementById(tag).src.replace(/^.*(\\|\/|\:)/, '');
	if (t.search(/^black*/) === -1){
		document.getElementById(tag).src="images/"+t;
	} else {
		document.getElementById(tag).src="images/"+t.replace(/^black-*/,'');
	}
	console.log(t);
	
}

function scoreRoll() {

}

function getKeptDice() {

}

function updateKeptDice() {

}

let dice = [
{maxSides:6, isLocked:0, nbrSide:[1,2,3,4,5,6]},
{maxSides:8, isLocked:0, nbrSide:[1,2,3,4,5,6,1,2]},
{maxSides:10, isLocked:0, nbrSide:[1,2,3,4,5,6,1,2,3,4]},
{maxSides:12, isLocked:0, nbrSide:[1,2,3,4,5,6,1,2,3,4,5,6]},
{maxSides:14, isLocked:0, nbrSide:[1,2,3,4,5,6,1,2,3,4,5,6,1,2]},
{maxSides:20, isLocked:0, nbrSide:[1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2]}
];

shuffleArray(dice);
let keptDice = [];
//scoreRoll(myRoll);