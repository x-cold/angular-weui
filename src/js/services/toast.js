/**
 * @name toast.js
 * @description $weuiToast
 * @author xcold
 * @date 2016/4/4
 */

(function(weuiModule) {
	weuiModule
		.factory('$weuiToast', [
			'$timeout',
			'$q',
			'$weuiBody',
			'$compile',
			'$rootScope',
			function($timeout, $q, $weuiBody, $compile, $rootScope) {
				var toastInstance,
					TOAST_FINISH =
					'<div id="weuiToast" class="aweui-show">' +
					'<div class="weui_mask_transparent"></div>' +
					'<div class="weui_toast">' +
					'<i class="weui_icon_toast"></i>' +
					'<p class="weui_toast_content" ng-bind="text"></p>' +
					'</div>' +
					'</div>',
					TOAST_LOADING =
					'<div id="weuiToast" class="weui_loading_toast aweui-show">' +
					'<div class="weui_mask_transparent"></div>' +
					'<div class="weui_toast">' +
					'<div class="weui_loading">' +
					'<div class="weui_loading_leaf weui_loading_leaf_0"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_1"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_2"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_3"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_4"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_5"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_6"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_7"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_8"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_9"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_10"></div>' +
					'<div class="weui_loading_leaf weui_loading_leaf_11"></div>' +
					'</div>' +
					'<p class="weui_toast_content" ng-bind="text"></p>' +
					'</div>' +
					'</div>',
					templates = {
						loading: TOAST_LOADING,
						finish: TOAST_FINISH
					},
					$weuiToast = {
						/**
						 * ```javascript
						 *  $weuiToast.show({
						 *    type: 'loading'
						 *  }).then(function(res) {
						 *    $state.go('home');
						 *  });
						 * ```
						 */
						show: showToast,
						/**
						 * @ngdoc method
						 * @name $weuiToast#hide
						 * @description 如果存在一个toast实例，则移除
						 */
						hide: hideToast,
						/**
						 * @constructor
						 */
						_createToast: createToast
					};
				return $weuiToast;

				function createToast(options) {
					var self = {};
					self.options = extend({
						scope: null,
						type: 'loading',
						delay: 3000,
						text: '...',
						appendTo: $weuiBody.get()
					}, options || {});

					self.remove = function() {
						self.element.remove();
						self.scope.$destroy();
					};

					self.scope = (self.options.scope || $rootScope).$new();
					self.show = function() {
						self.element = jqLite(templates[self.options.type]);
						self.options.appendTo.appendChild(self.element[0]);
						$compile(self.element)(self.scope);
						return $q(function(resolve, reject) {
							if (self.options.delay != 0) {
								$timeout(function() {
									self.remove();
									resolve();
								}, self.options.delay);
							}
						})
					};

					extend(self.scope, {
						text: self.options.text
					});

					return self;
				}

				function showToast(options) {
					if (!toastInstance || toastInstance.options != options) {
						toastInstance = createToast(options);
					}
					return toastInstance.show();
				}

				function hideToast() {
					if (toastInstance) {
						toastInstance.remove();
					}
				}
			}
		])

})(window.weuiModule);