'use strict';

angular.module('chatterControllers', []).
  controller('TitleCtrl', [
    '$scope', 
    'PageService', 
    function($scope, PageService) {
      $scope.$watch(function() {
          return PageService.getTitle();
      }, function(newValue, oldValue) {
          $scope.title = newValue;
      });
    }
  ]).
  controller('NavCtrl', [
    '$scope',
    '$NamedRouteService',
    'SITE_TITLE',
    function ($scope, $NamedRouteService, SITE_TITLE) {
      $scope.siteTitle = SITE_TITLE;
      $scope.links = [
        {href : $NamedRouteService.reverse('home'), text: 'Home'},
        {href : $NamedRouteService.reverse('about'), text: 'About'}
      ];
      // $scope.links.reverse();
      $scope.$watch('activeNavLink', function(newValue){
        _.each($scope.links, function(link){
          if (link.text.toLowerCase() === newValue.toLowerCase()) {
            link.active = true; 
          } else {
            link.active = false;
          }
        });
      });
    }
  ]).
  controller('HomeCtrl', [
    '$scope',
    'Tasks',
    function ($scope, Tasks) {
      $scope.tasks = Tasks.find({});
    }
  ]).
  controller('AboutCtrl', [
    '$scope',
    function ($scope) {
      // Nothing.
    }
  ]).
  controller('CreateTaskCtrl', [
    '$scope',
    'Tasks',
    function ($scope, Tasks) {
      $scope.createTask = function() {
        console.log("here");
        console.log($scope.createTaskForm);
        console.log($scope.createTaskForm.$valid);
        if ($scope.createTaskForm.$valid){
          Tasks.insert({
            task : $scope.task,
            date : $scope.date,
          });
        } 
      };
    }
  ]).
  controller('CreateUserCtrl', [
    '$scope',
    'Users',
    function ($scope, Users) {
      $scope.createUser = function() {
        if ($scope.createUserForm.$value) {
          Users.insert({
            username : $scope.username,
            created_at: Date.now(),
            email : $scope.email,
            password : $scope.password,
            bleet : 0
          });
        }
      };
    }
    ]).
  controller('TaskListItemCtrl', [
    '$scope',
    'Tasks',
    function ($scope, Tasks) {
        // Nothing.
    }
  ]).
  controller('LoginCtrl', [
    '$scope',
    'Accounts',
    function ($scope, Accounts) {
      $scope.login = function() {
        if ($scope.loginForm.$valid){
          Accounts.loginWithPassword(
            $scope.email, 
            $scope.password,
            function(error) {
              console.log(error);
              // Handle login error.
            }
          );
        } 
      };
      $scope.createLogin = function() {
        console.log($scope.createLoginForm);
      console.log($scope.createLoginForm.$valid);
        if ($scope.createLoginForm.$valid) {
          Accounts.createUser(
            $scope.username,
            $scope.email,
            $scope.password,
            {
              bleet: 0
            }
          );
        }
      };
    }
  ]);






