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
						delay: 1000,
						text: '已完成交易'
					}).then(function() {
						console.log('finished');
					});
				};
				// 显示3s后完成
				$scope.loadingToast = function() {
					$weuiToast.show({
						type: 'loading',
						delay: 0,
						text: '正在玩命加载..'
					}).then(function() {
						console.log('loaded');
					});
					setTimeout(function() {
						$weuiToast.hide();
					}, 1000);
				};
			}
		])

	.controller('dialogController', ['$scope', '$weuiDialog',
		function($scope, $weuiDialog) {
			// alert
			$scope.alert = function() {
				$weuiDialog.alert({
					title: 'alert',
					template: 'alert测试页面。。。。。。。。。。。。'
				}).then(function() {
					console.log('finished');
				});
			};
			// confirm
			$scope.confirm = function() {
				$weuiDialog.confirm({
					title: '测试',
					template: 'confirm测试页面。。。。。。。。。。。。'
				}).then(function(res) {
					if (res) {
						console.log('You are sure');
					} else {
						console.log('You are not sure');
					}
				})
			};
		}
	])
});