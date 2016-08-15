var myApp=angular.module('myApp', ['ngMaterial']);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){
  $scope.sendJob = function(){
    var jobToSend = {
      company: $scope.company,
      title: $scope.title,
      date: $scope.date
    };
    $http({
      method: 'POST',
      url: '/addJob',
      data: jobToSend
    });//end $http
    console.log('jobToSend', jobToSend);
    $scope.company = '';
    $scope.title = '';
  };
}]);
