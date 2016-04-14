'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
    .module('sbAdminApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar'
    ])
    .constant("BaseUrl", "http://202.120.40.175:")
    .constant("partnerPort", "21115")
    .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        debug:false,
        events:true
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login',{
            templateUrl:'views/login.html',
            url:'/login',
            controller: 'LoginCtrl',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/loginController.js']
                    }),
                    $ocLazyLoad.load({
                        name:'ngCookies',
                        files:['bower_components/angular-cookies/angular-cookies.js']
                    });
                }
            }
        })

        .state('manage',{
            templateUrl:'views/manage.html',
            url:'/manage',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
                            'views/component/header/header.js',
                            'views/component/sidebar/sidebar.js',
                            'scripts/controllers/manageController.js'
                        ]
                    }),
                    $ocLazyLoad.load({
                        name:'toggle-switch',
                        files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                            "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                        ]
                    }),
                    $ocLazyLoad.load({
                        name:'ngAnimate',
                        files:['bower_components/angular-animate/angular-animate.js']
                    }),
                    $ocLazyLoad.load({
                        name:'ngCookies',
                        files:['bower_components/angular-cookies/angular-cookies.js']
                    }),
                    $ocLazyLoad.load({
                        name:'ngResource',
                        files:['bower_components/angular-resource/angular-resource.js']
                    }),
                    $ocLazyLoad.load({
                        name:'ngSanitize',
                        files:['bower_components/angular-sanitize/angular-sanitize.js']
                    }),
                    $ocLazyLoad.load({
                        name:'ngTouch',
                        files:['bower_components/angular-touch/angular-touch.js']
                    });
                }
            }
        })
        .state('manage.chart',{
            templateUrl:'views/chart.html',
            url:'/chart',
            controller:'ChartCtrl',
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'chart.js',
                        files:[
                            'bower_components/angular-chart.js/dist/angular-chart.min.js',
                            'bower_components/angular-chart.js/dist/angular-chart.css'
                        ]
                    }),
                    $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
                            'scripts/controllers/chartController.js',
                            'views/component/header/header.js',
                            'views/component/sidebar/sidebar.js'
                        ]
                    })
                }
            }
        })
        .state('manage.admin',{
            templateUrl:'views/admin.html',
            url:'/admin',
            controller:'AdminCtrl',
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
                            'scripts/controllers/adminController.js'
                        ]
                    }),
                    $ocLazyLoad.load({
                        name:'smart-table',
                        files:[
                            'bower_components/angular-smart-table/dist/smart-table.min.js'
                        ]
                    })
                }
            }
        })
    //   .state('dashboard.table',{
    //     templateUrl:'views/table.html',
    //     url:'/table'
    // })
    //   .state('dashboard.panels-wells',{
    //       templateUrl:'views/ui-elements/panels-wells.html',
    //       url:'/panels-wells'
    //   })
    //   .state('dashboard.buttons',{
    //     templateUrl:'views/ui-elements/buttons.html',
    //     url:'/buttons'
    // })
    //   .state('dashboard.notifications',{
    //     templateUrl:'views/ui-elements/notifications.html',
    //     url:'/notifications'
    // })
    //   .state('dashboard.typography',{
    //    templateUrl:'views/ui-elements/typography.html',
    //    url:'/typography'
    //})
    //   .state('dashboard.icons',{
    //    templateUrl:'views/ui-elements/icons.html',
    //    url:'/icons'
    //})
    //   .state('dashboard.grid',{
    //    templateUrl:'views/ui-elements/grid.html',
    //    url:'/grid'
    //})
    }]);

    
