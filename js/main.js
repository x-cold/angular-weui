/**
 * @name main.js
 * @description requirejs配置文件、angular引导
 * @author xcold
 * @date 2016/4/4
 */

(function(window) {
    require.config({
        appDir: '.',
        baseUrl: './js',
        paths: {
            'angular': '../lib/angular/angular',
            'uiRouter': '../lib/angular-ui-router/angular-ui-router',
            'weui': '../weui'
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'weui': {
                deps: ['angular'],
                exports: 'weui'
            },
            'uiRouter': {
                deps: ['angular'],
                exports: 'uiRouter'
            }
        }
    });

    require([
        'angular',
        'uiRouter',
        'app',
        'services',
        'directives',
        'controllers',
        'filters',
        'weui'
    ], function(
        angular,
        uiRouter,
        app,
        services,
        directives,
        controllers,
        filters,
        weui
    ) {
        angular.bootstrap(document, [
            'weui',
            'myApp',
            'myApp.services',
            'myApp.directives',
            'myApp.controllers',
            'myApp.filters'
        ]);
    });
})(window);
