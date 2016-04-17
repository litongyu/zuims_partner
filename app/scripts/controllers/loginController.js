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

        factory.whetheradmin = function(sceneId){
            return $http({
                method: "get",
                url: BaseUrl + partnerPort + "/partner/whetheradmin?sceneId=" + sceneId,
                crossDomain: true
            });
        }
        return factory;

    }])
    .controller('LoginCtrl', ['$scope','$cookies','$rootScope', 'LoginFactory', '$state',
        function($scope, $cookies, $rootScope, LoginFactory, $state) {
            $scope.login = function(){
                LoginFactory.login($scope.account, $scope.password)
                    .success(function (data){
                        if(data.status == false){
                            alert(data.errorMes);
                            return;
                        }
                        $cookies.putObject('currentUser', data);
                        console.log(JSON.stringify(data));
                        LoginFactory.whetheradmin(data.sceneId)
                            .success(function (data1){
                                if(data1.toString() == "true") {
                                    $state.go('manage.admin');
                                }
                                else{
                                    $state.go('manage.chart');
                                }
                            });
                    })
                    .error(function(){
                        alert("登录失败,请检查网络!");
                    });
            }
        }
    ]);