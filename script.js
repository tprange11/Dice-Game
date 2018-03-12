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
	for (let i = 0; i < dice.length; i++) {
		if (dice[i].isLocked === 0){
			let min = 0,
			max = dice[i].maxSides - 1,
			nbrSide = dice[i].nbrSide;
			shuffleArray(nbrSide);
			let siderolled = Math.floor(Math.random() * (max - min + 1)) + min;
			dice[i].rolled = dice[i].nbrSide[siderolled];
		}
	}
	console.log(dice);
	canRoll = false;
	return dice;
}

function showDiceRolled() {
	let hardFilterCount = dice.filter(checkHardLock);
	if (hardFilterCount.lenth === 6) {
		scoreRoll(dice);
		
	}
	if (canRoll === true) {
		let myRoll =rollDie(dice),
		x = "",																	//This line should be removed
		y = "",
		filtered = dice.filter(checkSoftLock); 
		hardLockDice(filtered);
		for (let i = 0;i < myRoll.length;i++) { //This line should be removed
			x += myRoll[i].maxSides+",";					//This line should be removed
		}
		for (let i = 0;i < myRoll.length;i++) {
			y += myRoll[i].rolled+",";
			let tag= "dice_" + (i+1);
			if (dice[i].isLocked === 0){
				document.getElementById(tag).src=getImage(myRoll[i].rolled);
			}
		}
		console.log("x = " + x +"y = " + y); //This line should be removed
		return y;
	} else {
		alert("You can not roll at this time.");
	}
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

	let filename = document.getElementById(tag).src.replace(/^.*(\\|\/|\:)/, '');
	let diceOrder = document.getElementById('prevRoll').innerText;
	if (dice[tag.replace(/^dice_/, '')-1].isLocked === 0){
		canRoll = true;
		dice[tag.replace(/^dice_/, '')-1].isLocked = 1;
		if (filename.search(/^black*/) === 0){
			document.getElementById(tag).src = "images/" + filename;
		} else {
			document.getElementById(tag).src = "images/black-" + filename;
		}
		console.log(filename);
	}
}

function unSelectDie(tag) {
	let filename = document.getElementById(tag).src.replace(/^.*(\\|\/|\:)/, '');
	if (dice[tag.replace(/^dice_/, '')-1].isLocked === 2) {
		alert("You can not change this die.");
	} else {
		dice[tag.replace(/^dice_/, '')-1].isLocked = 0;
		if (filename.search(/^black*/) === -1){
			document.getElementById(tag).src = "images/" + filename;
		} else {
			document.getElementById(tag).src = "images/" + filename.replace(/^black-*/,'');
		}
		console.log(filename);
	}


}

function hardLockDice(lockList) {
	for (let i = 0;i < lockList.length;i++){
		let counter = 0;
		for (let x = 0;x < dice.length;x++) {
			if (lockList[i].maxSides === dice[x].maxSides){
				dice[x].isLocked =2;
				break;
			}

		}


	}

}

function checkHardLock(lock) {
    return lock.isLocked === 2;
}

function checkSoftLock(lock) {
    return lock.isLocked === 1;
}

function checkNoLock(lock) {
    return lock.isLocked === 0;
}

function scoreRoll(dice) {
	filtered = dice.filter(checkSoftLock); 
	hardLockDice(filtered);
	filtered = dice.filter(checkHardLock);
		
	let diceCount = [filtered.filter(checkOnes).length, filtered.filter(checkTwos).length, filtered.filter(checkThrees).length, filtered.filter(checkFours).length, filtered.filter(checkFives).length, filtered.filter(checkSixs).length ]
	let triples = 0;
	let doubles = 0;
	let singles = 0;
	let countOne = filtered.filter(checkOnes).length;
	let countTwo = filtered.filter(checkTwos).length;
	let countThree = filtered.filter(checkThrees).length;
	let countFour = filtered.filter(checkFours).length;
	let countFive = filtered.filter(checkFives).length;
	let countSix = filtered.filter(checkSixs).length;
	
	for (let i = 0;i < diceCount.length; i++) {
		switch(diceCount[i]) {
			case 3:
				triples++;
				break;
			case 2:
				doubles++;
				break;
			case 1:
				singles++;
				break;
		}
	}

	if (singles === 6 ) {
		score += 1500;
	}
	if (triples === 2) {
		score += 2500;
	}
	if (doubles === 3) {
		score += 750;
	}
	if (countOne > 0) {
		score += countOne * 100;
	}
	if (countTwo > 2) {
		score += countTwo * 200;
	}
	if (countThree > 2) {
		score += countThree * 300;
	}
	if (countFour > 2) {
		score += countFour * 400;
	}
	if (countFive > 0) {
		score += countFive * 50;
	}
	if (countSix > 2) {
		score += countSix * 600;
	}
	return score;
}

function checkOnes(lock) {
    return lock.rolled === 1;
}

function checkTwos(lock) {
    return lock.rolled === 2;
}

function checkThrees(lock) {
    return lock.rolled === 3;
}

function checkFours(lock) {
    return lock.rolled === 4;
}

function checkFives(lock) {
    return lock.rolled === 5;
}


function checkSixs(lock) {
    return lock.rolled === 6;
}

function passDice() {
	let score = scoreRoll(dice);
	alert("You're score was " + score + ".");
	location.reload();

}

function updateKeptDice() {
}

let dice = [
{maxSides:6, isLocked:0, rolled:0, nbrSide:[1,2,3,4,5,6]},
{maxSides:8, isLocked:0, rolled:0, nbrSide:[1,2,3,4,5,6,1,2]},
{maxSides:10, isLocked:0, rolled:0, nbrSide:[1,2,3,4,5,6,1,2,3,4]},
{maxSides:12, isLocked:0, rolled:0, nbrSide:[1,2,3,4,5,6,1,2,3,4,5,6]},
{maxSides:14, isLocked:0, rolled:0, nbrSide:[1,2,3,4,5,6,1,2,3,4,5,6,1,2]},
{maxSides:20, isLocked:0, rolled:0, nbrSide:[1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2]}
];
let canRoll = true;
let score = 0;

shuffleArray(dice);
//scoreRoll(myRoll);