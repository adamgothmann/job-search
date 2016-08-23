var myApp=angular.module('myApp', ['ngMaterial']);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){
  $scope.allJobs = [];
  $http({
    method: 'GET',
    url:'/addJob/loadJobs'
  }).then(function(response){
    $scope.allJobs = response.data;
  });

  $scope.sendJob = function(){
    var status = 'applied';
    var jobToSend = {
      company: $scope.company,
      title: $scope.title,
      date: $scope.date,
      status: status
    };
    $http({
      method: 'POST',
      url: '/addJob',
      data: jobToSend
    });//end $http
    console.log('jobToSend', jobToSend);
    $scope.company = '';
    $scope.title = '';
    $http({
      method: 'GET',
      url: '/addJob',
    }).then(function(response){
      $scope.allJobs = response.data;
      console.log($scope.allJobs);
    });
  };//end sendJob
  // $scope.sendJob();//loads jobs on page load

  $scope.jobStatus = [
    {status: 'applied'},
    {status: 'rejected'},
    {status: 'heard back'},
    {status: 'interview scheduled'},
    {status: 'interviewed'}
  ];
  // $scope.jobStatus = ['applied', 'rejected', 'heard back', 'interview scheduled', 'interviewed'];
  $scope.getStatus = function(index){
    var statusToSend = {
      id: index,
      status: this.status.status
    };
    console.log(statusToSend);
    $http({
      method: 'POST',
      url: 'updateStatus',
      data: statusToSend
    });
  };
}]);
