'use strict';

const requirejsOptimize = require('gulp-requirejs-optimize'),
	prettify = require('gulp-jsbeautifier'),
	gulpSequence = require('gulp-sequence'),
	minifyCSS = require('gulp-minify-css'),
	combCss = require('gulp-csscomb'),
	stylus = require('gulp-stylus'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	jslint = require('gulp-jslint'),
	gulpCopy = require('gulp-copy'),
	serv = require('gulp-serv'),
	gulp = require('gulp');

const PATH = {
	EXAMPLE: {
		stylus: './src/docs/css/stylus/**/*.styl',
		stylus_main: './src/docs/css/stylus/common.styl',
		stylesheet: './src/docs/css/**/*.css',
		javascript: './src/docs/js/**/*.js',
	},
	SOURCE: {
		stylesheet: './src/css/**/*.css',
		javascript: './src/js/**/*.js'
	},
	DIST: 'docs'
};

gulp.task('resetBuild', function() {
	PATH['DIST'] = 'release';
});

/**
 *	COMPRESS STYLUS
 */
gulp.task('STYLUS_COMPRESS', function() {
	gulp.src(PATH['EXAMPLE'].stylus)
		.pipe(stylus({
			compress: true,
		}))
		.pipe(concat('commin.css'))
		.pipe(gulp.dest(PATH['DIST'] + '/css'));
});

/**
 *	CONCAT STYLESHEET
 */
gulp.task('CSS_CONCAT', ['STYLUS_COMPRESS'], function() {
	gulp.src([PATH['EXAMPLE'].stylesheet])
		.pipe(minifyCSS())
		.pipe(concat('main.min.css'))
		.pipe(gulp.dest(PATH['DIST']  + '/css'));
});

/**
 *	JSLINT
 */
gulp.task('JS_LINT', function() {
	return gulp.src([PATH['SOURCE'].javascript])
		.pipe(jslint())
		.on('error', function(error) {
			console.warn(String(error));
		});
});

/**
 *	MINIFY JAVASCRIPT
 */
gulp.task('JS_MINIFY', function() {
	return gulp.src([PATH['SOURCE'].javascript]) //需要操作的文件
		.pipe(prettify())
		.pipe(concat('weui.js'))
    .pipe(gulp.dest(PATH['DIST']))
		.pipe(uglify()) //压缩
		.pipe(concat('weui.min.js')) //合并所有js到main.js
		.pipe(gulp.dest(PATH['DIST'])) //输出到文件夹
});

/**
 *	START A STACTIC SERVER FOR EXAMPLE
 */
gulp.task('STATIC_SERVER', function(done) {
	serv.start({
		root: __dirname + "/docs",
		port: 7000
	}, done);
});

gulp.task('default', ['CSS_CONCAT', 'JS_MINIFY', 'STATIC_SERVER']);

gulp.task('build', gulpSequence(['resetBuild', 'JS_LINT', 'JS_MINIFY']));
