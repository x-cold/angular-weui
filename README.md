#angular 1.x + weui

将weui整合到angular项目，面向服务进行封装

### 引用文件

+ angular.min.js
+ weui.js

### 主要思路

+ 整合weui提供的组件，封装转换为angularJS的服务(service)，提供调用的接口，可直接从angular引入或者借助requirejs、seajs进行依赖管理。

+ 整合部分组件为指令(directive)

_借助$q将服务以promise的形式处理异步_

### 计划

+ 展示DEMO的UI原型（已完成）

+ weui组件服务化

	* Toast [已完成]
	* Dialog [进行中]
	* Progress [进行中]
	* ActionSheet [进行中]

+ weui组件指令
	* SearchBar [进行中]

### 备注

本项目起始于2016/4/4，主要意于推动weui在angular 1.x的应用场景拓展。代码比较粗糙，欢迎提交issue共同讨论。（本项目已停止开发和维护）

### 使用方法

本项目完全使用gulp进行工作流组织，执行以下命令达到你期待的结果吧。

1. `gulp` 调试（请访问 http://localhost:70000/）

2. `gulp build` 生成release版本

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
