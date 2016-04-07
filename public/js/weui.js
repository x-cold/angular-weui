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

		/**
		 * weuiToast服务
		 */
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
					'<p class="weui_toast_content">已完成</p>' +
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
					'<p class="weui_toast_content">数据加载中</p>' +
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
						appendTo: $weuiBody.get()
					}, options || {});

					self.remove = function() {
						self.element.remove();
						self.scope.$destroy();
					};

					self.show = function() {
						self.scope = (self.options.scope || $rootScope).$new();
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

		.factory('weuiDialog', [
			'$timeout',
			'$q',
			'$weuiBody',
			'$compile',
			'$rootScope',
			function($timeout, $q, $weuiBody, $compile, $rootScope) {
				var dialogInstance,
					DIALOG_ALERT =
					'<div class="weui_dialog_confirm">' +
					'<div class="weui_mask"></div>' +
					'<div class="weui_dialog">' +
					'<div class="weui_dialog_hd">' +
					'<strong class="weui_dialog_title">{{title}}</strong></div>' +
					'<div class="weui_dialog_bd">{{template}}</div>' +
					'<div class="weui_dialog_ft">' +
					'<a href="javascript:;" class="weui_btn_dialog primary">确定</a>' +
					'</div>' +
					'</div>' +
					'</div>',
					DIALOG_CONFIRM =
					'<div class="weui_dialog_confirm">' +
					'<div class="weui_mask"></div>' +
					'<div class="weui_dialog">' +
					'<div class="weui_dialog_hd">' +
					'<strong class="weui_dialog_title">{{title}}</strong></div>' +
					'<div class="weui_dialog_bd">{{template}}</div>' +
					'<div class="weui_dialog_ft">' +
					'<a href="javascript:;" class="weui_btn_dialog primary">确定</a>' +
					'<a href="javascript:;" class="weui_btn_dialog default">取消</a>' +
					'</div>' +
					'</div>' +
					'</div>',
					templates = {
						alert: DIALOG_ALERT,
						confirm: DIALOG_CONFIRM
					},
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
						alert: alert,
						/**
						 * @ngdoc method
						 * @name $weuiToast#hide
						 * @description 如果存在一个toast实例，则移除
						 */
						confirm: confirm,
						createDialog: createDialog
					};
				return $weuiDialog;

				function createDialog(options) {
					var options = extend({
							scope: null,
							template: '自定义弹窗内容，居左对齐表示，告知需要确认的信息等',
							title: '弹窗标题'
							appendTo: $weuiBody.get()
						}, options || {}),
						scope = (self.options.scope || $rootScope).$new();
					var tpl = templates['alert'].replace('{{template}}', options.template);
					tpl = tpl.replace('{{title}}', options.title);
					var element = jqLite(templates[options.alert]);
					options.appendTo.appendChild(self.element[0]);
					$compile(element)(scope);
					return $q(function(resolve, reject) {

					});
				}

				function confirm(options) {
					var options = extend({
							scope: null,
							template: '自定义弹窗内容，居左对齐表示，告知需要确认的信息等',
							title: '弹窗标题'
							appendTo: $weuiBody.get()
						}, options || {}),
						scope = (self.options.scope || $rootScope).$new();
					var tpl = templates['alert'].replace('{{template}}', options.template);
					tpl = tpl.replace('{{title}}', options.title);
					var element = jqLite(templates[options.alert]);
					options.appendTo.appendChild(self.element[0]);
					$compile(element)(scope);
					return $q(function(resolve, reject) {

					});
				}

				function alert(options) {
					var options = extend({
							scope: null,
							template: '自定义弹窗内容，居左对齐表示，告知需要确认的信息等',
							title: '弹窗标题'
							appendTo: $weuiBody.get()
						}, options || {}),
						scope = (self.options.scope || $rootScope).$new();
					var tpl = templates['alert'].replace('{{template}}', options.template);
					tpl = tpl.replace('{{title}}', options.title);
					var element = jqLite(templates[options.alert]);
					options.appendTo.appendChild(self.element[0]);
					$compile(element)(scope);
					return $q(function(resolve, reject) {

					});
				}
			}
		])
	})(window.weui);
})();