'use strict';

const requirejsOptimize = require('gulp-requirejs-optimize'),
	minifyCSS = require('gulp-minify-css'),
	stylus = require('gulp-stylus'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	jslint = require('gulp-jslint'),
	serv = require('gulp-serv'),
	gulp = require('gulp');

/**
 *	config
 */
const config = {

};

/**
 *	path
 */
const path = {
	source: {
		stylus: './src/stylus/**/*.styl',
		stylus_main: './src/stylus/common.styl',
		css: ['./src/public/css/*.css'],
		js: ['./src/public/js/**/*.js'],
	},
	dist: './dist'
}

/**
 *	stylus
 */
gulp.task('compress', function() {
	gulp.src([path.source.stylus_main])
		.pipe(stylus({
			compress: true,
		}))
		.pipe(gulp.dest(dist + '/css'));
});

/**
 *	css concat
 */

gulp.task('css', function() {
	gulp.src(path.source.css)
		.pipe(concat('main.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(dist + '/css'));
});

/**
 *	jslint
 */
gulp.task('jslint', function() {
	return gulp.src(path.source.js)
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
		port: 7000
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

gulp.task('build');

gulp.task('test');