/**
 * Created by kubenetes on 16/4/10.
 */
angular.module('sbAdminApp')
    .factory("LoginFactory",['$http', "BaseUrl", 'partnerPort', function($http, BaseUrl, partnerPort){
        var factory = {};
        factory.login = function(account, password){
            var data = {};
            data.account = account;
            data.password = password;
            return $http({
                method: "POST",
                url: BaseUrl + partnerPort + "/partner/login",
                data: JSON.stringify(data),
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                crossDomain: true
            });
        }
        return factory;

    }])
    .controller('LoginCtrl', ['$scope','$cookies','$state', '$rootScope', 'LoginFactory',
        function($scope, $cookies, $state, $rootScope, LoginFactory) {
            $scope.login = function(){
                LoginFactory.login($scope.account, $scope.password)
                    .success(function (data){
                        if(data.errorMes == "密码错误"){
                            alert("密码错误,请重试");
                            return;
                        }
                        $cookies.partnerId = data.partnerId;
                        $rootScope.hehe = data.name;
                        $state.go('manage.chart');
                    })
                    .error(function(){
                        alert("登录失败,请检查网络!");
                    });
            }
        }
    ]);