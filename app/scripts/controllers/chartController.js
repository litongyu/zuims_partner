'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
	.controller('ChartCtrl', ['$scope', '$timeout', '$rootScope', '$cookies', '$state', function ($scope, $timeout, $rootScope, $cookies, $state) {
		//alert(document.getElementById("hehe").innerHTML);
		if($cookies.get('currentUser') == undefined || $cookies.get('authority') == undefined){
			$state.go('login');
		}
		function getToday() {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			if (month < 10)
				month = '0' + month;
			if (day < 10)
				day = '0' + day;
			return year + '-' + month + '-' + day;
		}

		$('#startDate').datetimepicker({
			viewMode: 'days',
			format: 'YYYY-MM-DD',
			maxDate: getToday(),
			locale: 'zh-cn'
		});

		$('#endDate').datetimepicker({
			viewMode: 'days',
			format: 'YYYY-MM-DD',
			maxDate: getToday(),
			locale: 'zh-cn'
		});

		$rootScope.Category = "扫码人数";
		$scope.line = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			series: ['Series A', 'Series B'],
			data: [
			  [65, 59, 80, 81, 56, 55, 40],
			  [28, 48, 40, 19, 86, 27, 90]
			],
			onClick: function (points, evt) {
			  console.log(points, evt);
			}
		};

		//$scope.bar = {
		//	labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
		//	series: ['Series A', 'Series B'],
        //
		//	data: [
		//	   [65, 59, 80, 81, 56, 55, 40],
		//	   [28, 48, 40, 19, 86, 27, 90]
		//	]
        //
		//};
        //
		//$scope.donut = {
		//	labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
		//	data: [300, 500, 100]
		//};
        //
		//$scope.radar = {
		//	labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        //
		//	data:[
		//		[65, 59, 90, 81, 56, 55, 40],
		//		[28, 48, 40, 19, 96, 27, 100]
		//	]
		//};
        //
		//$scope.pie = {
		//	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
		//	data : [300, 500, 100]
		//};
        //
		//$scope.polar = {
		//	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
		//	data : [300, 500, 100, 40, 120]
		//};
        //
		//$scope.dynamic = {
		//	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
		//	data : [300, 500, 100, 40, 120],
		//	type : 'PolarArea',
        //
		//	toggle : function ()
		//	{
		//		this.type = this.type === 'PolarArea' ?
		//		'Pie' : 'PolarArea';
		//	}
		//};
}]);