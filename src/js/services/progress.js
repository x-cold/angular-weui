/**
 * @name progress.js
 * @description $weuiProgress
 * @author xcold
 * @date 2016/4/24
 */

(function(weuiModule) {
	weuiModule
		.factory('$weuiProgress', [
			'$timeout',
			'$q',
			'$weuiBody',
			'$compile',
			'$rootScope',
			function($timeout, $q, $weuiBody, $compile, $rootScope) {
				var progress;
			}
		])
})(window.weuiModule);
