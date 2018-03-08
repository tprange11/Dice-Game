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
	}
	console.log("x = " + x +"y = " + y);
	return y;
	
	
}

function scoreRoll() {
	
}

function getKeptDice() {
	
}

function updateKeptDice() {
	
}

let dice = [
	{maxSides:6, nbrSide:[1,2,3,4,5,6]},
 	{maxSides:8, nbrSide:[1,2,3,4,5,6,1,2]},
	{maxSides:10, nbrSide:[1,2,3,4,5,6,1,2,3,4]},
	{maxSides:12, nbrSide:[1,2,3,4,5,6,1,2,3,4,5,6]},
	{maxSides:14, nbrSide:[1,2,3,4,5,6,1,2,3,4,5,6,1,2]},
	{maxSides:20, nbrSide:[1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2]}
];

shuffleArray(dice);
let keptDice = [];
//scoreRoll(myRoll);