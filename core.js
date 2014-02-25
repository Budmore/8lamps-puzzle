lamps = [
	{ nr: 0, state: false},
	{ nr: 1, state: false},
	{ nr: 2, state: false},
	{ nr: 3, state: false},
	{ nr: 4, state: false},
	{ nr: 5, state: false},
	{ nr: 6, state: false},
	{ nr: 7, state: false}
];



var clickLamp = function(lamp) {
	var index = _.indexOf(lamps, lamp);

	var indexList = [index-1, index, index+1];

	indexList = [index];

	// How find next and prev item in array?
	if (index-1 < 0) {
		indexList.push(lamps.length-1);
		console.log('if -1', lamps.length-1);
	}else{
		indexList.push(index-1);
	}

	if (index+1 > lamps.length-1){
		indexList.push(0);
	}else{
		indexList.push(index+1);
	}
	console.log('indexes', indexList);
	for (var i=0 ; i<indexList.length; i++){
		lamps[indexList[i]].state = !lamps[indexList[i]].state;
	}
};


/* Correct answer */
// clickLamp(lamps[1]);
// clickLamp(lamps[3]);
// clickLamp(lamps[4]);
// clickLamp(lamps[5]);
// clickLamp(lamps[6]);
// clickLamp(lamps[7]);
// clickLamp(lamps[0]);
// clickLamp(lamps[2]);


console.log('lamps', lamps);
