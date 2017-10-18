/**
 * @name services.js
 * @description 服务
 * @author xcold
 * @date 2016/4/4
 */

define(['angular'], function(angular) {
	'use strict';

	/* Services */

	angular.module('myApp.services', [])

	/**
	 *	设置窗口标题
	 *	@param	{string} title 标题
	 */
	.factory('setWindowTitle', ['$rootScope', function($rootScope) {
		return function(title) {
			if (!check(title)) {
				$rootScope.title = '----';
			} else {
				$rootScope.title = title;
			}
		}
	}])

});
