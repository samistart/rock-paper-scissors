var myApp = angular.module('myApp', []);

myApp.controller('PricesController', ['$scope', '$http',
    function($scope, $http){

    var HANDS = ["Rock", "Paper", "Scissors"];
    var RESULTS = {
        '0' : "It's a draw.",
        '1' : "You win!",
        '-1' : "You lose."
    }
    var isPressed = false;

    function init(){
        $scope.computerChoiceButtonContent = "-";
        $scope.result = "Play your hand.";
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getResult(i, j){
        var d = i - j;
        if(Math.abs(d) == 2){
            d = - (d - (d / 2));
        }
        return d;
    }

    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    function countdown(timeLeft, i){
        $scope.computerChoiceButtonContent = timeLeft;
        if(timeLeft == 0){
            var j = getRandomInt(0, HANDS.length - 1);
            $scope.computerChoiceButtonContent = HANDS[j];
            var res = getResult(i, j);
            $scope.result = RESULTS[res];
            isPressed = false;
            return;
        }
        else{
            $scope.computerChoiceButtonContent = timeLeft;
            sleep(1000).then(() => {
                countdown(timeLeft - 1, i);
                $scope.$apply();
            })
        }

    }

    $scope.playHand =function(handNumber) {
        if (isPressed) {
            return;
        }
        isPressed = true;
        $scope.result = "Drum roll...";
        var countdownTime = 3;
        countdown(countdownTime, handNumber);
    }

    init();

    }]);
