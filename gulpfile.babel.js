import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserify from "browserify";
import babelify from "babelify";

// http://blog.revathskumar.com/2016/02/browserify-with-gulp.html
import source from 'vinyl-source-stream';
import buffer from "vinyl-buffer";

// Arquivo de config 
import { Defaults, Paths } from './config';

// Loading Plugins
const $ = gulpLoadPlugins();

// Recebendo a variável de Ambiente
const ENV = process.env.NODE_ENV || 'DEV';

// DEFAULT's 
const { s3URL, qaURL, isIllustrator, isPlaybuzz } = Defaults;

// PATH's dos estáticos
const { images, styles, scripts, views } = Paths;

//Views
gulp.task('html-watch', function (done) {
    browserSync.reload();
    done();
});
//JS
gulp.task('js-watch', function (done) {
    browserSync.reload();
    done();
});

// Watch 
gulp.task('watch',() => {
	gulp.watch(scripts, ['js-watch']),
	gulp.watch(views, ['html-watch']);
}).on('change', browserSync.reload);

// Live browser
gulp.task('browserLive',() => {
	browserSync.init({
		port: 8000,
		server: {
			baseDir: [
				'./',
			]
		}
	});
});


// Clean BUILD
// gulp.task('clean',() => del(['./public/build/**'], { dot: true }) );

// Task's 
// gulp.task('default',['browserify','lint','sass','images','watch','views','browserLive']);
gulp.task('default',['watch','browserLive']);

/* O Sass só esta aqui para forçar a troca da variable de $s3URL, que será "append" dinamicamente. */
// gulp.task('build',['clean','sass'],() => runSequence(['views:build','copy']));



