'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap']).
  controller('AppCtrl', function($scope, $http, $location) {
      $scope.tasks = [];

      //list tasks directive
      $http.get('/tasks').
      success(function (data, status, headers, config) {
        $scope.tasks = data;
      }).
      error(function (data, status, headers, config) {
        $scope.tasks = [
        {
          body: data,
        }]
      });
    $scope.save = function(task) {
      $http({
        method: 'POST',
        url: '/tasks',
        data: task
      }).
      success(function (data, status, headers, config) {
        document.getElementById('task_task').value = '';
        document.getElementById('dateComplete').value = '';
        var newArray = $scope.tasks.unshift(data);
        return newArray;
      }).
      error(function (data, status, headers, config) {
        $scope.name = 'ERROR!!!';
      });
      console.log($scope.task);
      console.log($scope.user);
    }

    $scope.deleteAdd = function(task) {
      $http({
        method: 'DELETE',
        url: '/tasks/' + task._id
      }).
      success(function (data, status, headers, config) {
            var delete_index = $scope.tasks.indexOf(task);
            var newArray = $scope.tasks.splice(delete_index, 1);
          return newArray;
        }).
      error(function (data, status, headers,config) {
        $scope.name ="Error!!";
      });


    // $http({
    //   method: 'GET',
    //   url: '/api/name'
    // }).
    // success(function (data, status, headers, config) {
    //   $scope.name = data.name;
    // }).
    // error(function (data, status, headers, config) {
    //   $scope.name = 'Error!';
    // });
    }
  })
  .controller('LoginCtrl', function($scope, $http, $location) {
    $scope.register = function (user) {
      console.log(user);
      $http({
        method: 'POST',
        url: '/login/newRegister',
        data: user
      }).
      success(function (data, status, headers, config) {
        console.log('user saved!');
      }).
      error(function (data, status, headers, config) {
        $scope.name = 'Error!!!';
      });

    };
    $scope.loginUser = function (user) {
      $http({
        method: 'POST',
        url: '/login',
        data: user
      }).
      success(function (data, status, headers, config) {
        console.log('passed to the server!');
        $location.url('/');
      }).
      error(function (data, status, headers, config) {
        $scope.name = 'ERRRORRR!!!';
      });
      // $http.post('/login', user.loginUser);
      // console.log(user);
    };
    $scope.logout = function (user) {
      $http({
        method: 'GET',
        url: '/logout',
        data: user
      }).
      success(function (data, status, headers, config) {
        console.log('winning!');
        $location.url('/login');
      }).
      error(function (data, status, headers, config) {
        console.log('Did not log out');
      });
    };
  })
  .controller('ProgressCtrl', function($scope, $location) {
    $scope.max = 200;
    
    $scope.random = function() {
      var value = 150,
        type;

    if (value < 75) {
      type = 'heating up!';
    } else if (value < 150) {
      type = 'the herdsman!';
    } else if (value < 190) {
      type = 'almost there!';
    } else {
      type = 'Goats Away!';
    }

    $scope.showWarning = (type === 'Goats Away!' || type === 'almost there!');

    $scope.dynamic = value;
    $scope.type = type;
  }
});


