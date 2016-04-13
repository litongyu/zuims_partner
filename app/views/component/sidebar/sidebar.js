'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('sidebar',['$location', '$state', function($state) {
    return {
      templateUrl:'views/component/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope, $state){
        $scope.collapseVar = [0,1,1,1];
        
        $scope.check = function(x){
          
          if($scope.collapseVar[x] == 1)
            $scope.collapseVar[x] = 0;
          else
            $scope.collapseVar[x] = 1;
        };

        $scope.logout = function(){
          $state.go('login');
        }
      }
    }
  }]);
