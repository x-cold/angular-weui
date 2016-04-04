/**
 @name build.js
 @description RequireJS优化器
 @author xcold
 @initial time 2016-1-28
 */

({
    appDir: '.',
    baseUrl: './js',
    dir: './dist',
    modules: [{
        name: 'main'
    }],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'none',
    removeCombined: true,
    paths: {
        'angular': '../lib/angular/angular.min',
        'uiRouter': '../lib/angular-ui-router/release/angular-ui-router.min',
        'weui': 'weui'
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
    },
    priority: [
        "angular"
    ],
    waitSeconds: 0
})