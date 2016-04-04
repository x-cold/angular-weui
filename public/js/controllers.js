/**
 * @name controllers.js
 * @description 控制器
 * @author xcold
 * @date 2016/4/4
 */

define(['angular', 'services'], function(angular) {
	'use strict';

	return angular.module('myApp.controllers', ['myApp.services'])
		.controller('toastController', ['$scope', '$weuiToast',
			function($scope, $weuiToast) {
				// 显示1s后完成
				$scope.finishToast = function() {
					$weuiToast.show({
						type: 'finish',
						delay: 1000
					}).then(function() {
						console.log('finished');
					});
				};
				// 显示3s后完成
				$scope.loadingToast = function() {
					$weuiToast.show({
						type: 'loading'
					}).then(function() {
						console.log('loaded')
					});
				};
			}
		])
});