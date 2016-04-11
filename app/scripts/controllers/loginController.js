/**
 * Created by kubenetes on 16/4/10.
 */
angular.module('sbAdminApp')
    .controller('LoginCtrl', ['$scope','$cookies','$state',function($scope, $cookies, $state) {
        $scope.login = function(){
            //alert($scope.remember == undefined);
            $state.go('manage.chart');
            $cookies.username="litongyu";
        }
    }]);