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
        };

        factory.deletePartner = function(partnerId){
            var info = {};
            info.partnerId = partnerId;
            return $http({
                method: "POST",
                data: JSON.stringify(info),
                url: BaseUrl + partnerPort + "/partner/delete",
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                crossDomain: true
            });
        };

        factory.updatePartner = function(info){
            return $http({
                method: "POST",
                data: JSON.stringify(info),
                url: BaseUrl + partnerPort + "/partner/update",
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                crossDomain: true
            });
        };

        factory.createPartner = function(info){
            return $http({
                method: "POST",
                data: JSON.stringify(info),
                url: BaseUrl + partnerPort + "/partner/add",
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                crossDomain: true
            });
        };

        factory.clone = function(obj){
            var newO = {};

            if (obj instanceof Array) {
                newO = [];
            }
            for (var key in obj) {
                var val = obj[key];
                newO[key] = typeof val === 'object' ? arguments.callee(val) : val;
            }
            return newO;
        };

        factory.copy = function(from, to){
            for (var key in from) {
                var val = from[key];
                to[key] = typeof val === 'object' ? arguments.callee(val) : val;;
            }
        }

        return factory;

    }])
    .controller('AdminCtrl', ['$scope', 'AdminFactory', 'createDialog', '$filter',function($scope, AdminFactory, createDialog, $filter) {
        AdminFactory.getAllPartner()
            .success(function(data){
                var result = new Array();
                for(var x in data){
                    if(data[x].valid) {
                        result.push(data[x]);
                    }
                }
                $scope.rowCollection = result;
                $scope.displayCollection = [].concat($scope.rowCollection);
            })
        $scope.deletePartner = function(row){
            AdminFactory.deletePartner(row.partnerId)
                .success(function(data){
                    if(data.status == true){
                        var index = $scope.rowCollection.indexOf(row);
                        if(index !== -1){
                            $scope.rowCollection.splice(index, 1);
                        }
                    }
                })
        }

        var modalFooter = '<button class="btn btn-success btn-outline ng-binding" ng-click="updateSave()">' +
            '保存&nbsp<span class="glyphicon glyphicon-ok"></span></button>' +
        '<button class="btn btn-primary btn-outline ng-binding" ng-click="$modalCancel()">' +
            '取消&nbsp<span class="glyphicon glyphicon-trash"></span></button>';

        var createFooter = '<button class="btn btn-success btn-outline ng-binding" ng-click="create()">' +
            '添加&nbsp<span class="glyphicon glyphicon-plus"></span></button>' +
            '<button class="btn btn-primary btn-outline ng-binding" ng-click="$modalCancel()">' +
            '取消&nbsp<span class="glyphicon glyphicon-trash"></span></button>';

        $scope.updatePartner = function(row){
            createDialog('views/component/modal/simpleModal.html', {
                id: 'simpleDialog',
                title: '编辑用户信息',
                backdrop: true,
                css: {"left":"0%"},
                controller: 'ModifyCtrl',
                footerTemplate: modalFooter,
                success: {label: 'Success'}
            }, {
                row: row,
                edit: true
            });
        };

        $scope.createPartner = function(){
            var row = {};
            createDialog('views/component/modal/simpleModal.html', {
                id: 'createPartner',
                title: '创建新用户',
                backdrop: true,
                css: {"left":"0%"},
                controller: 'CreateCtrl',
                footerTemplate: createFooter,
                success: {label: 'Success'}
            }, {
                edit: false,
                row: row
            });
        };

    }])

    .controller('ModifyCtrl', ['$scope', 'AdminFactory', 'row', 'edit',
        function($scope, AdminFactory, row, edit) {
            //deep copy
            $scope.row = AdminFactory.clone(row);
            $scope.edit = edit;
            $scope.updateSave = function(){
                AdminFactory.updatePartner($scope.row)
                    .success(function(data){
                        if(data.status != true){
                            alert(data.errorMes);
                            $scope.$modalCancel();

                        }
                        else{
                            alert("修改成功");
                            AdminFactory.copy($scope.row, row);
                            $scope.$modalCancel();
                        }
                    })
                    .error(function(){
                        alert("网络错误");
                        $scope.$modalCancel();
                    })
            }

    }])

    .controller('CreateCtrl', ['$scope', 'AdminFactory', 'edit', 'row', '$state',
        function($scope, AdminFactory, edit, row, $state) {
            //deep copy
            $scope.row = row;
            $scope.edit = edit;
            $scope.create = function(){
                AdminFactory.createPartner($scope.row)
                    .success(function(data){
                        if(data.status != true){
                            alert(data.errorMes);
                            $scope.$modalCancel();

                        }
                        else{
                            alert("添加成功");
                            $scope.$modalCancel();
                            $state.reload();
                        }
                    })
                    .error(function(){
                        alert("网络错误");
                        $scope.$modalCancel();
                    })
            }
    }]);