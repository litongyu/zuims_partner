'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('ManageCtrl', function($scope) {
        var currentUserStr = $cookies.currentUser;
        var currentUser = JSON.parse(currentUserStr);
        $scope.username = currentUser.name;
    });
