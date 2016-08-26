var myApp=angular.module('myApp', ['ngMaterial', 'ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
          when("/home", {
              templateUrl: "/views/partials/home.html",
              controller: "mainController"
          }).
          when("/applied", {
              templateUrl: "/views/partials/applied.html",
              controller: "mainController"
          }).
          otherwise({
            redirectTo: '/home'
          });
}]);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){
  $scope.allJobs = [];
  $scope.applied = [];
  $scope.rejected = [];
  $scope.heardBack = [];
  $scope.interviewScheduled = [];
  $scope.interviewed = [];
  $http({
    method: 'GET',
    url:'/addJob/loadJobs'
  }).then(function(response){
    $scope.allJobs = response.data;
    for(var i = 0; i < $scope.allJobs.length; i++) {
      switch($scope.allJobs[i].status){
        case 'applied':
          // $scope.applied = $scope.allJobs.slice(i, (i + 1));
          var applied = $scope.allJobs.slice(i, (i + 1)).pop();
          $scope.applied.push(applied);
          break;
        case 'rejected':
          // $scope.rejected = $scope.allJobs.slice(i, (i + 1));
          var rejected = $scope.allJobs.slice(i, (i + 1)).pop();
          $scope.rejected.push(rejected);
          break;
        case 'heard back':
          // $scope.heardBack = $scope.allJobs.slice(i, (i + 1));
          var heardBack = $scope.allJobs.slice(i, (i + 1)).pop();
          $scope.heardBack.push(heardBack);
          break;
        case 'interview scheduled':
          // $scope.interviewScheduled = $scope.allJobs.slice(i, (i + 1));
          var interviewScheduled = $scope.allJobs.slice(i, (i + 1)).pop();
          $scope.interviewScheduled.push(interviewScheduled);
          break;
        case 'interviewed':
          // $scope.interviewed = $scope.allJobs.slice(i, (i + 1));
          var interviewed = $scope.allJobs.slice(i, (i + 1)).pop();
          $scope.interviewed.push(interviewed);
          break;
      }
    }
    console.log("applied ", $scope.applied );
    console.log("rejected ", $scope.rejected);
    console.log("heard back: ",$scope.heardBack);
    console.log("interview scheduled: ", $scope.interviewScheduled);
    console.log("interviewed ", $scope.interviewed);
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
      url: '/updateStatus',
      data: statusToSend
    });
  };
}]);
