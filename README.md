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

本项目起始于2016/4/4，主要意于推动weui在angular 1.x的应用场景拓展。代码比较粗糙，欢迎提交issue共同讨论。

### 使用方法

本项目完全使用gulp进行工作流组织，执行以下命令达到你期待的结果吧。

1. `gulp` 调试（请访问 http://localhost:70000/）

2. `gulp build` 生成release版本
