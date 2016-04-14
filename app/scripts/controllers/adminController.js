/**
 * Created by kubenetes on 16/4/14.
 */
angular.module('sbAdminApp')
    .factory("AdminFactory",['$http', "BaseUrl", 'partnerPort', function($http, BaseUrl, partnerPort){
        var factory = {};
        factory.getAllPartner = function(){
            return $http({
                method: "GET",
                url: BaseUrl + partnerPort + "/partner/all",
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                crossDomain: true
            });
        }

        return factory;

    }])
    .controller('AdminCtrl', ['$scope', 'AdminFactory', function($scope, AdminFactory) {
        AdminFactory.getAllPartner()
            .success(function(data){
                var result = new Array();
                for(var x in data){
                    if(data[x].valid) {
                        result.push(data[x]);
                    }
                }
                $scope.allPartners = result;
            })
    }]);