var app = angular.module('angulatestApp', ['ngStorage']);

app.controller('HomeCtrl', function ($scope, $http, $localStorage) {
  // Default fact identifier value
  $scope.$storage = $localStorage.$default({ factId: 0 });

  $http.get('/static/facts.json').then(function (result) {
    $scope.facts = result.data;

    var id = 0;
    do {
      id = Math.floor(Math.random() * $scope.facts.length);
    } while (id == $scope.$storage.factId);
    $scope.$storage.factId = id;
    $scope.randomFact = $scope.facts[id];
  });
});
