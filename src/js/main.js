/**
 * @name weui.js
 * @description weui Angular集成
 * @author xcold
 * @date 2016/4/4
 */

'use strict';
var extend = angular.extend,
	forEach = angular.forEach,
	isDefined = angular.isDefined,
	isNumber = angular.isNumber,
	isString = angular.isString,
	jqLite = angular.element,
	noop = angular.noop;

(function(window) {
	window.weui = {};
	window.weui.version = '0.0.1';
	window.weuiModule = angular.module('weui', []);
})(window);
