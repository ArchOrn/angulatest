var app = angular.module('UrfMadnessApp', ['ngStorage']);

app.controller('HomeCtrl', function ($scope, $http, $localStorage) {
  // Default fact identifier value
  $scope.$storage = $localStorage.$default({ factId: 0 });

  $scope.units = {
    percentage: '%',
    meters: 'm'
  };

  $scope.leagues = {};
  $scope.leagueIndex = 0;

  $scope.chooseLeague = function (league) {
    if ($scope.leagues[0] != league && $scope.leagues[1] != league) {
      $scope.leagues[$scope.leagueIndex] = league;
      $scope.leagueIndex = ($scope.leagueIndex == 0 ? 1 : 0);
      console.log($scope.leagues);
    }
  };

  $http.get('/static/facts.json').then(function (result) {
    $scope.facts = result.data;

    $scope.roll = function () {
      var id = 0;
      do {
        id = Math.floor(Math.random() * $scope.facts.length);
      } while (id == $scope.$storage.factId);
      $scope.$storage.factId = id;
      $scope.randomFact = $scope.facts[id];
    };

    $scope.roll();
  });
});
