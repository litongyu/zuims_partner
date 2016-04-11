'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('header',function(){
		return {
			templateUrl:'views/component/header/header.html',
			restrict: 'E',
			replace: true,
			controller:function($scope){
				$scope.logout = function(){
					//alert("logout");
					window.location="#/login";
				}
			}
    	}
	});


