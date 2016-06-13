// angular module for app
var app = angular.module('myApp', []);

app.controller('tasksController', function($scope, $http) {
  getTask();
  function getTask() {
  $http.post("ajax/getTask.php").success(function(data) {
        $scope.tasks = data;
       });
  };
  $scope.addTask = function (task) {
    $http.post("ajax/addTask.php?task="+task).success(function(data){
        getTask();
        // $scope.taskInput = "";
      });
  };
  //
  // $(document).ready(function(){
  // $("#submit").click(function(){
  // var game=$('input[type="radio"]:checked').val();
  // if($('input[type="radio"]:checked').length !== "0")
  // {
  // $.ajax({
  // type: "POST",
  // url: "addTask.php",
  // data: "radio="+radio,
  // success: function()
  // {
  // $("#msg").html("value Entered");
  // }
  // });
  // }
  // return false;
  // });
  // });




  $scope.deleteTask = function (task) {
    if(confirm("Удалить запись?")) {
    $http.post("ajax/deleteTask.php?taskID="+task).success(function(data) {
        getTask();
      });
    }
  };

  $scope.toggleStatus = function(item, status, task) {
    if(status=='1') {
      status='0';
    }
    else {
      status='1';
    }
      $http.post("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data) {
        getTask();
      });
  };

});

// random background image
app.factory("bgImage", function($http) {

  var bgImage = {},
    remoteAPI = "http://www.splashbase.co/api/v1/images/random";

  bgImage.getImages = function() {
    return $http({
      method: "GET",
      url: remoteAPI
    });
  }
  return bgImage;
});

app.controller("myCtrl", function($scope, bgImage) {

  bgImage.getImages().success(function(response) {
    document.body.style.backgroundImage = "url(" + response.url + ")";
  });
});
