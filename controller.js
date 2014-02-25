appLamps.controller('LampsController', ['$scope', 'lampsService',
    function($scope, lampsService) {

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
            checkLocalStorage();
            $scope.lamps = angular.copy(lampsService.getModel());
            $scope.clicks = 0;
        };


        var secretLevel = function() {
            return 'Congratz! You Win! \n Share this game with someone you like';
        };


        var checkLocalStorage = function() {
            $scope.bestResult = localStorage.bestResult;
        };

        var checkLampsStatus = function() {
            var hasFalse = _.some($scope.lamps, function(lamp) {
                return lamp.state === false;
            });

            $scope.isWinner = !hasFalse;

            if (!hasFalse) {
                localStorage.setItem('bestResult', $scope.clicks);
            }
        };

        var updateProgressBar = function() {
            var clicks = $scope.clicks;
            var bestResult = localStorage.bestResult;

            var ratio = (clicks / bestResult) * 100;

            if ( clicks > bestResult ){
                ratio = (bestResult / clicks) * 100;
                $scope.orangeBar = { width: 100 - ratio + '%' };
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



        /**
         *  @name init
         *  @description Initialize controller
         */

        (function init(){
            checkLocalStorage();
            updateProgressBar();
            $scope.resetGame();
        })();
    }
]);
