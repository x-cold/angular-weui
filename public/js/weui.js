/**
 * @name directives.js
 * @description 指令集
 * @author xcold
 * @date 2016/4/4
 */
(function() {
	window.weui = window.weui || {};
	window.weui.version = '0.0.1';

	(function(weui) {
		var weuiModule = angular.module('weui', ['ui.router']),
			extend = angular.extend,
			forEach = angular.forEach,
			isDefined = angular.isDefined,
			isNumber = angular.isNumber,
			isString = angular.isString,
			jqLite = angular.element,
			noop = angular.noop;

		/**
		 * Services
		 */
		weuiModule
			.factory('$weuiBody', ['$document', function($document) {
				return {
					addClass: function() {
						for (var x = 0; x < arguments.length; x++) {
							$document[0].body.classList.add(arguments[x]);
						}
						return this;
					},
					removeClass: function() {
						for (var x = 0; x < arguments.length; x++) {
							$document[0].body.classList.remove(arguments[x]);
						}
						return this;
					},
					enableClass: function(shouldEnableClass) {
						var args = Array.prototype.slice.call(arguments).slice(1);
						if (shouldEnableClass) {
							this.addClass.apply(this, args);
						} else {
							this.removeClass.apply(this, args);
						}
						return this;
					},
					append: function(ele) {
						$document[0].body.appendChild(ele.length ? ele[0] : ele);
						return this;
					},
					get: function() {
						return $document[0].body;
					}
				};
			}])
			.factory('$weuiToast', ['$timeout', '$q', '$weuiBody', '$compile', '$rootScope',
				function($timeout, $q, $weuiBody, $compile, $rootScope) {
					var TOAST_FINISH =
						'<div id="finishToast" class="aweui-show">' +
						'<div class="weui_mask_transparent"></div>' +
						'<div class="weui_toast">' +
						'<i class="weui_icon_toast"></i>' +
						'<p class="weui_toast_content">已完成</p>' +
						'</div>' +
						'</div>';
					var TOAST_LOADING =
						'<div id="loadingToast" class="weui_loading_toast aweui-show">' +
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
						'<p class="weui_toast_content">数据加载中</p>' +
						'</div>' +
						'</div>';
					var $weuiToast = {
						/**
						 * ```javascript
						 *  $weuiToast.prompt({
						 *    type: 'loading'
						 *  }).then(function(res) {
						 *    $state.go('home');
						 *  });
						 * ```
						 */
						show: show,
						createToast: createToast
					};
					return $weuiToast;

					function createToast(options) {
						var self = {};
						options = extend({
							scope: null,
							type: 'loading',
							delay: 3000
						}, options || {});

						var templates = {
							loading: TOAST_LOADING,
							finish: TOAST_FINISH
						};

						self.remove = function() {
							self.element.remove();
							self.scope.$destroy();
						};

						self.show = function() {
							self.scope = (options.scope || $rootScope).$new();
							self.element = jqLite(templates[options.type]);
							$weuiBody.get().appendChild(self.element[0]);
							$compile(self.element)(self.scope);
							return $q(function(resolve, reject) {
								$timeout(function() {
									self.remove();
									resolve();
								}, options.delay);
							})
						};

						return self;
					}

					function show(options) {
						return createToast(options).show();
					}
				}
			])

	})(window.weui);
})();