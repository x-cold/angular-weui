'use strict';

const requirejsOptimize = require('gulp-requirejs-optimize'),
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

var path = {
	source: {
		stylus: 'src/stylus/**/*.styl',
		stylus_main: 'src/css/common.styl',
		css: 'src/css/*.css',
		js: 'src/js/**/*.js',
	},
	dist: 'public'
};

gulp.task('resetBuild', function() {
	path.dist = 'release';
});

/**
 *	stylus
 */
gulp.task('compress', function() {
	gulp.src(path.source.stylus_main)
		.pipe(stylus({
			compress: true,
		}))
		.pipe(gulp.dest('src/css'));
});

/**
 *	css concat
 */

gulp.task('css', ['compress'], function() {
	gulp.src([path.source.css])
		.pipe(concat('weui.css'))
		.pipe(combCss())
		.pipe(gulp.dest(path.dist + '/css'))
		.pipe(minifyCSS())
		.pipe(concat('weui.min.css'))
		.pipe(gulp.dest(path.dist + '/css'));
});

/**
 *	jslint
 */
gulp.task('jslint', function() {
	return gulp.src([path.source.js])
		.pipe(jslint())
		.on('error', function(error) {
			console.error(String(error));
		});
});

/**
 *	js concat and uglify
 */
gulp.task('minifyjs', function() {
	return gulp.src([path.source.js])
		.pipe(concat('weui.js'))
		.pipe(gulp.dest(path.dist + '/js'))
		.pipe(uglify())
		.pipe(concat('weui.min.js'))
		.pipe(gulp.dest(path.dist + '/js'));
});

/**
 *	static server
 */
gulp.task('server', function(done) {
	serv.start({
		root: __dirname + "/public",
		port: 7000
	}, done);
});

/**
 *	watcher stylus
 */
gulp.watch([path.source.stylus], ['compress']).on('change', function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running compressor');
});

gulp.watch([path.source.css], ['css']).on('change', function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running css handle');
});

gulp.task('default', ['css', 'minifyjs', 'server']);

gulp.task('build', gulpSequence(['resetBuild', 'css', 'minifyjs']));