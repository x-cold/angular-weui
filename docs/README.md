### Angular Weui框架说明

> weuiToast 服务

+ 介绍：toast对象主要提供加载中和已完成的提示框【无用户交互】

	DEMO：[http://blog.lxstart.net/weui/templates/#toast](http://blog.lxstart.net/weui/templates/#toast)

+ 调用方法

```javascript
// 弹出成功提示框，1s消失（Promise）
$weuiToast.show({
	type: 'finish',
	delay: 1000,
	text: '已完成交易'
}).then(function() {
	console.log('finished');
});

// 显示加载中提示框
$weuiToast.show({
	type: 'loading',
	delay: 0,	//不自动消失
	text: '正在玩命加载..'
});

// 移除提示框
$weuiToast.hide();
setTimeout(function() {
	$weuiToast.hide();
}, 2000);
```

+ 开发情况

基本完成服务化的编码，还需要优化性能

	* 移除toast和通过隐藏toast的智能判断

	* 组件化，提供自定义模板

> weuiDialog 服务

+ 介绍：dialog对象主要提供模态框（`alert`、`confirm`、`prompt`、`modal`）

+ 调用方法

```javascript
// alert
$weuiDialog.alert({
	title: 'alert',
	template: 'alert测试页面。。。。。。。。。。。。'
}).then(function() {
	console.log('finished');
});

//confirm
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
```

+ 开发情况

完成alert\confirm服务化的编码，还需要继续完善prompt\dialog服务化编码
