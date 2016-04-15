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
