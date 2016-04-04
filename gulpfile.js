var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jslint = require('gulp-jslint');
var serv = require('gulp-serv');
var requirejsOptimize = require('gulp-requirejs-optimize');

/**
 *	source path
 */
var src = {
	stylus: './stylus/src/**/*.styl',
	stylus_main: './stylus/src/common.styl',
	css: ['./public/css/src/*.css'],
	js: ['./public/js/**/*.js'],
}

var dest = {
	css: './public/css',
}

/**
 *	stylus
 */
gulp.task('compress', function() {
	gulp.src([src.stylus_main])
		.pipe(stylus({
			compress: true,
		}))
		.pipe(gulp.dest(dest.css + '/src'));
});

/**
 *	css concat
 */

gulp.task('css', function() {
	gulp.src(src.css)
		.pipe(concat('main.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(dest.css));
});

/**
 *	jslint
 */
gulp.task('jslint', function() {
	return gulp.src(src.js)
		.pipe(jslint())
		.on('error', function(error) {
			console.error(String(error));
		});
});


/**
 *	js uglify and concat
 */
gulp.task('minifyjs', function() {
	return gulp.src([src.controllers, src.widget]) //需要操作的文件
		.pipe(uglify()) //压缩
		.pipe(concat('controller.js')) //合并所有js到main.js
		.pipe(gulp.dest('./public/js/')) //输出到文件夹
});


/**
 *	copy static files
 */
gulp.task('copy', function() {
	var start = src.unhandle;
	gulp.src(start)
		.pipe(gulpCopy('./dist/', {
			start: start
		}))
});

/*
 *	requirejs optimize
 */
gulp.task('scripts', function() {
	gulp.src('./public/js/**/*.js')
		.pipe(requirejsOptimize())
		.pipe(gulp.dest('./public/dist'))
});

/**
 *	static server
 */
gulp.task("server", function(done) {
	serv.start({
		root: __dirname + "/public",
		port: 80
	}, done);
});

/**
 *	watcher stylus
 */
gulp.watch([src.stylus], ['compress']).on('change', function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running compressor');
});

gulp.watch([src.css], ['css']).on('change', function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running css handle');
});

gulp.task('default', ['compress', 'css', 'jslint', 'server']);