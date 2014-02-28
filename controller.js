appLamps.controller('LampsController', ['$scope', '$interval', '$timeout', 'lampsService',
	function($scope, $interval, $timeout, lampsService) {
		var alreadyWon;
		/**
		 *  @param {object} lamp One of the clicked dots.
		 *
		 *  @description
		 *  Change status of 3 lamps. Clicked lamp, one before and one after.
		 */
		$scope.clickLamp = function(lamp) {
			$scope.clicks = $scope.clicks + 1;
			updateStatus(lamp);
			updateProgressBar();
			checkLampsStatus();
		};

		$scope.resetGame = function() {
			$scope.clicks = 0;
			$scope.lamps = angular.copy(lampsService.getModel());

			getBestResult();
			updateProgressBar();
			alreadyWon = false;
		};

		var getBestResult = function() {
			$scope.bestResult = localStorage.bestResult;
		};

		var setBestResult = function(clicks) {
			var bestResult = localStorage.bestResult;
			if ( clicks <= bestResult || angular.isUndefined(bestResult)) {
				localStorage.setItem('bestResult', clicks);
			}
		};

		var checkLampsStatus = function() {
			var hasFalse = _.some($scope.lamps, function(lamp) {
				return lamp.state === false;
			});

			if (!hasFalse) {
				setBestResult($scope.clicks);
				getBestResult();
				displayWinnerInfo();
			}
		};

		var updateProgressBar = function() {
			var clicks = $scope.clicks;
			var bestResult = localStorage.bestResult;

			var ratio = (clicks / bestResult) * 100;

			if ( clicks > bestResult ){
				ratio = (bestResult / clicks) * 100;
				$scope.orangeBar = { width: 100 - ratio + '%' };
			} else {
				$scope.orangeBar = { width: 0 };
			}

			$scope.greenBar = {
				width: ratio + '%'
			};
		};



		var updateStatus = function(lamp) {
			var lamps = $scope.lamps;
			var index = _.indexOf(lamps, lamp);
			var indexList = [index];

			// How find next and prev item in array?
			if (index-1 < 0) {
				indexList.push(lamps.length-1);
			}else{
				indexList.push(index-1);
			}

			if (index+1 > lamps.length-1){
				indexList.push(0);
			}else{
				indexList.push(index+1);
			}


			for (var i=0 ; i<indexList.length; i++){
				$scope.lamps[indexList[i]].state = !lamps[indexList[i]].state;
			}

		};

		var displayWinnerInfo = function() {
			if (!alreadyWon) {
				var clicksBefore = angular.copy($scope.clicks);
				var startMessage =1100;
				var endMessage = 1150;

				var getDelay = function() {
					$timeout(setDeleay, 50);
				};

				var setDeleay = function() {
					if ( startMessage < endMessage ){
						$scope.clicks = startMessage;
						getDelay();
					} else {
						$scope.clicks = clicksBefore;
					}
					startMessage += 1;
				};

				getDelay();
				alreadyWon = true;

			}
		};

		/**
		 *  @name init
		 *  @description Initialize controller
		 */

		(function init(){
			getBestResult();
			updateProgressBar();
			$scope.resetGame();
		})();
	}
]);
