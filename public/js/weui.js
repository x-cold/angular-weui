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

(function(window, document) {
	window.weui = window.weui || {};
	window.weui.version = '0.0.1';
	window.weuiModule = angular.module('weui', ['ui.router']);
})(window, document);

/**
 * @name body.js
 * @description $weuiBody
 * @author xcold
 * @date 2016/4/4
 */

(function(weuiModule) {
	weuiModule
		.factory('$weuiBody', [
			'$document',
			function($document) {
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
			}
		])
})(window.weuiModule);

/**
 * @name dialog.js
 * @description $weuiDialog
 * @author xcold
 * @date 2016/4/4
 */

(function(weuiModule) {
	weuiModule
		.factory('$weuiDialog', [
			'$timeout',
			'$q',
			'$weuiBody',
			'$compile',
			'$rootScope',
			'$sce',
			function($timeout, $q, $weuiBody, $compile, $rootScope, $sce) {
				var DIALOG_TPL =
					'<div class="weui_dialog_confirm">' +
					'<div class="weui_mask"></div>' +
					'<div class="weui_dialog">' +
					'<div class="weui_dialog_hd">' +
					'<strong class="weui_dialog_title" ng-bind="title"></strong>' +
					'</div>' +
					'<div class="weui_dialog_bd" ng-bind-html="template"></div>' +
					'<div class="weui_dialog_ft" ng-show="buttons.length">' +
					'<a href="javascript:;" ng-repeat="button in buttons" ng-click="$buttonTapped(button, $event)" class="weui_btn_dialog" ng-class="button.type || \'primary\'" ng-bind="button.text"></a>' +
					'</div>' +
					'</div>' +
					'</div>',
					$weuiDialog = {
						/**
						 * ```javascript
						 *  $weuiToast.alert({
						 *    title: 'test',
						 *	  template: 'test test'
						 *  }).then(function(res) {
						 *    $state.go('home');
						 *  });
						 * ```
						 */
						alert: showAlert,
						/**
						 * @ngdoc method
						 * @name $weuiToast#hide
						 * @description 如果存在一个dialog实例，则移除
						 */
						confirm: showConfirm,
						createDialog: createDialog
					};
				return $weuiDialog;

				function createDialog(options) {
					options = extend({
						scope: null,
						title: '弹窗标题',
						template: '自定义弹窗内容，居左对齐表示，告知需要确认的信息等',
						buttons: [],
						appendTo: $weuiBody.get()
					}, options || {});

					var self = {};
					self.scope = (options.scope || $rootScope).$new();
					self.element = jqLite(DIALOG_TPL);
					self.responseDeferred = $q.defer();

					options.appendTo.appendChild(self.element[0]);
					$compile(self.element)(self.scope);
					extend(self.scope, {
						title: options.title,
						buttons: options.buttons,
						template: $sce.trustAsHtml(options.template),
						$buttonTapped: function(button, event) {
							var result = (button.onTap || noop).apply(self, [event]);
							event = event.originalEvent || event; //jquery events

							if (!event.defaultPrevented) {
								self.responseDeferred.resolve(result);
							}
						}
					});

					$q.when(
						options.template || options.content || ''
					).then(function(template) {
						var dialogBody = jqLite(self.element[0].querySelector('.weui_dialog_bd'));
						if (template) {
							dialogBody.html(template);
							$compile(dialogBody.contents())(self.scope);
						} else {
							dialogBody.remove();
						}
					});

					self.show = function() {
						if (self.isShown || self.removed) return;
						self.isShown = true;
						self.element.removeClass('dialog-hidden');
						self.element.addClass('dialog-showing active');
					};

					self.hide = function(callback) {
						callback = callback || noop;
						if (!self.isShown) return callback();
						self.isShown = false;
						self.element.removeClass('active');
						self.element.addClass('dialog-hidden');
						$timeout(callback, 250, false);
					};

					self.remove = function() {
						if (self.removed) return;

						self.hide(function() {
							self.element.remove();
							self.scope.$destroy();
						});

						self.removed = true;
					};

					return self;
				}

				function showDialog(options) {
					var dialog = $weuiDialog.createDialog(options);
					var showDelay = 0;

					// Expose a 'close' method on the returned promise
					dialog.responseDeferred.promise.close = function dialogClose(result) {
						if (!dialog.removed) dialog.responseDeferred.resolve(result);
					};
					//DEPRECATED: notify the promise with an object with a close method
					dialog.responseDeferred.notify({
						close: dialog.responseDeferred.close
					});

					doShow();

					return dialog.responseDeferred.promise;

					function doShow() {
						$timeout(dialog.show, showDelay, false);
						dialog.responseDeferred.promise.then(function(result) {
							dialog.remove();
							return result;
						});

					}
				}

				function showAlert(opts) {
					return showDialog(extend({
						buttons: [{
							text: opts.okText || '确定',
							type: opts.okType || 'primary',
							onTap: function() {
								return true;
							}
						}]
					}, opts || {}));
				}

				function showConfirm(opts) {
					return showDialog(extend({
						buttons: [{
							text: opts.cancelText || '取消',
							type: opts.cancelType || 'default',
							onTap: function() {
								return false;
							}
						}, {
							text: opts.okText || '确定',
							type: opts.okType || 'primary',
							onTap: function() {
								return true;
							}
						}]
					}, opts || {}));
				}
			}
		])
})(window.weuiModule);
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