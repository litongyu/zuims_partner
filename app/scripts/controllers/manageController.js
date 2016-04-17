'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('ManageCtrl', ['$scope', '$position', '$cookies', function($scope,$position,$cookies) {
        //var currentUserStr = $cookies.currentUser;
        //var currentUser = JSON.parse(currentUserStr);

        var currentUserStr = $cookies.get('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        $scope.username = currentUser.name;
    }]);
