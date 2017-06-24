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
          when("/rejected", {
            templateUrl: "/views/partials/rejected.html",
            controller: "mainController"
          }).
          when("/heardBack", {
            templateUrl: "/views/partials/heardBack.html",
            controller: "mainController"
          }).
          when("/interviewScheduled", {
            templateUrl: "/views/partials/interviewScheduled.html",
            controller: "mainController"
          }).
          when("/interviewed", {
            templateUrl: "/views/partials/interviewed.html",
            controller: "mainController"
          }).
          otherwise({
            redirectTo: "/home"
          });
}]);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){
  $scope.allJobs = [];
  $scope.applied = [];
  $scope.rejected = [];
  $scope.heardBack = [];
  $scope.interviewScheduled = [];
  $scope.interviewed = [];

  var totalJobs;
  var appliedJobs;
  var rejectedJobs;
  var heardBackJobs;
  var interviewScheduledJobs;
  var interviewedJobs;


  $http({
    method: 'GET',
    url:'/addJob'
  }).then(function(response){
    $scope.allJobs = response.data;
    console.log($scope.allJobs);
      for(var i = 0; i < $scope.allJobs.length; i++) {
        // console.log($scope.allJobs[i].company, $scope.allJobs[i].followed_up);
        // if($scope.allJobs[i].followed_up == true){
        //   console.log($scope.allJobs[i].company);
        //   $scope.follow = true;
        // } else {
        //   // console.log($scope.allJobs[i].followed_up);
        // }
        switch($scope.allJobs[i].status){
          case 'applied':
            // $scope.applied = $scope.allJobs.slice(i, (i + 1));
            var applied = $scope.allJobs.slice(i, (i + 1)).pop();
            $scope.applied.push(applied);
            $scope.appliedJobs = $scope.applied.length;
            break;
          case 'rejected':
            // $scope.rejected = $scope.allJobs.slice(i, (i + 1));
            var rejected = $scope.allJobs.slice(i, (i + 1)).pop();
            $scope.rejected.push(rejected);
            $scope.rejectedJobs = $scope.rejected.length;
            break;
          case 'heard back':
            // $scope.heardBack = $scope.allJobs.slice(i, (i + 1));
            var heardBack = $scope.allJobs.slice(i, (i + 1)).pop();
            $scope.heardBack.push(heardBack);
            $scope.heardBackJobs = $scope.heardBack.length;
            break;
          case 'interview scheduled':
            // $scope.interviewScheduled = $scope.allJobs.slice(i, (i + 1));
            var interviewScheduled = $scope.allJobs.slice(i, (i + 1)).pop();
            $scope.interviewScheduled.push(interviewScheduled);
            $scope.interviewScheduledJobs = $scope.interviewScheduled.length;
            break;
          case 'interviewed':
            // $scope.interviewed = $scope.allJobs.slice(i, (i + 1));
            var interviewed = $scope.allJobs.slice(i, (i + 1)).pop();
            $scope.interviewed.push(interviewed);
            $scope.interviewedJobs = $scope.interviewed.length;
            break;
        }
      }
      $scope.totalJobs = $scope.allJobs.length;
      console.log($scope.totalJobs);
      console.log("appliedJobs" + $scope.appliedJobs);

    });

    // var appliedJobs = $scope.applied.length;
    // var rejectedJobs = $scope.rejected.length;
    // var heardBackJobs = $scope.heardBack.length;
    // var interviewScheduledJobs = $scope.interviewScheduled.length;
    // var interviewedJobs = $scope.interviewed.length;






  //Creates an object from the form fields.
  $scope.sendJob = function(){
    $scope.totalJobs++;
    var jobToSend = {
      company: $scope.company,
      title: $scope.title,
      date: $scope.date,
      status: "applied",
      followed_up: "FALSE"
    };

    //pushes the job to the allJobs array.
    $scope.allJobs.push(jobToSend);
    console.log($scope.allJobs);

    //Sends the job to the /addJob route on the server.
    $http({
      method: 'POST',
      url: '/addJob',
      data: jobToSend
    });//end $http
    console.log('jobToSend', jobToSend);
    $scope.company = '';
    $scope.title = '';
    // $http({
    //   method: 'GET',
    //   url: '/addJob',
    // }).then(function(response){
    //   $scope.allJobs = response.data;
    //   console.log($scope.allJobs);
    // });
  };//end sendJob
  // $scope.sendJob();//loads jobs on page load

  //available options for job status.
  $scope.jobStatus = [
    {status: 'applied'},
    {status: 'rejected'},
    {status: 'heard back'},
    {status: 'interview scheduled'},
    {status: 'interviewed'}
  ];

  $scope.getStatus = function(index){
    var statusToSend = {
      id: index,
      status: this.status.status
    };

    $scope.allJobs[(index - 1)].status = this.status.status;
    console.log(statusToSend);

    //sends the current jobs status to the /updateStatus route on the server.
    $http({
      method: 'POST',
      url: '/updateStatus',
      data: statusToSend
    });
  };

  //Removes a job from the view.
  $scope.removeJob = function(id, index){
    //Decrements the total job count by 1.
    $scope.totalJobs--;

    console.log(id, index);
    $scope.allJobs.splice(index, 1);

    var jobToRemove = {
      id: id
    };

    //Sends the id of the job to be removed to the /removeJob route on the server.
    $http({
      method: 'POST',
      url: '/removeJob',
      data: jobToRemove
    });
  };

  $scope.followUp = function(id, index){
    console.log(id, index, document.getElementById(id).checked);
    if(document.getElementById(id).checked === true)
    {
      console.log('true');
    }else if(document.getElementById(id).checked === false){
      console.log('false');
    }else{
      console.log('didn\'t work');
    }
    var jobToChange = {
      index: index
    };
    $http({
      method: 'POST',
      url: '/followUp',
      data: jobToChange
    });
  };
}]);
