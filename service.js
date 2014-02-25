appLamps.service('lampsService', function(){

	model = [
		{ nr: 0, state: false },
		{ nr: 1, state: false },
		{ nr: 2, state: false },
		{ nr: 3, state: false },
		{ nr: 4, state: false },
		{ nr: 5, state: false },
		{ nr: 6, state: false },
		{ nr: 7, state: false }
	];

	this.getModel = function() {
		return	model;
	};


});
