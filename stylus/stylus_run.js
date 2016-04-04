var fs = require('fs');
// 定义目标文件、源入口/路径
var dist = '../public/css/main.css';
var __dirname = '.';
var main = __dirname + '/src/common.styl';
var paths = [
	__dirname, __dirname + '/src'
];

var stylus = require('stylus'),
	str = require("fs").readFileSync(main, 'utf8');

var run = (function() {
	// 设置入口文件、源路径
	// 编译stylus文件
	stylus(str)
		.set('filename', main)
		.set('paths', paths)
		.render(function(err, css) {
			if (err) throw err;
			fs.writeFile(dist, css, function(err) {
				if (err)
					console.log("stylus编译失败！ 错误信息：" + err);
				else
					console.log("stylus编译成功！");
			});
		});
})();