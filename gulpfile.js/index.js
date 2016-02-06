'use strict';
var gulp = require('gulp');
var plug = require('gulp-load-plugins')({ lazy: true });
gulp.task('doc', gulp.parallel(buildDocs));
gulp.task('build', gulp.series(gulp.parallel(lintScripts, gulp.series(compileTypeScript, bundle, minify))));
gulp.task('serve', gulp.series(gulp.parallel(lintScripts, gulp.series(compileTypeScript, bundle)), gulp.parallel(watch, serve)));
var tsProject = plug.typescript.createProject('tsconfig.json');
function compileTypeScript() {
    return gulp.src(['src/**/*.ts'])
        .pipe(plug.debug())
        .pipe(plug.sourcemaps.init())
        .pipe(plug.typescript(tsProject))
        .pipe(plug.sourcemaps.write('.'))
        .pipe(gulp.dest('tmp/serve'));
}
function bundle() {
    var Builder = require('jspm').Builder;
    var builder = new Builder();
    return builder
        .buildStatic('tmp/serve/client.js', 'tmp/serve/bundle.js')
        .catch(function (error) { return console.log(error); });
}
function minify() {
    return gulp.src(['tmp/serve/bundle.js'])
        .pipe(plug.uglify())
        .pipe(gulp.dest('tmp/serve'));
}
function watch(neverDone) {
    gulp.watch(['src/**/*.ts'], gulp.series(compileTypeScript, bundle));
}
var browserSync = require('browser-sync').create();
function serve() {
    browserSync.init({
        files: [
            'tmp/serve/**/*.js',
            'src/**/*.{css,html}'
        ],
        server: {
            baseDir: [
                'tmp/serve', 'src', '.'
            ]
        }
    });
}
/**
 *
 */
function lintScripts(nextTask) {
    return gulp.src(['src/**/*.ts'])
        .pipe(plug.tslint({ tslint: require('tslint') }))
        .pipe(plug.tslint.report('verbose'), {
        emitError: false,
        summarizeFailureOutput: true
    }).on('error', function () { return nextTask(); });
}
var path = require('path');
function buildDocs() {
    var src = [
        'src/**/*.ts',
    ];
    var APP_TITLE = 'title';
    var DOCS_DEST = 'docs';
    return gulp.src(src)
        .pipe(plug.typedoc({
        // TypeScript options (see typescript docs)
        module: 'commonjs',
        target: 'es5',
        includeDeclarations: true,
        // Output options (see typedoc docs)
        out: DOCS_DEST,
        json: path.join(DOCS_DEST, 'data/docs.json'),
        name: APP_TITLE,
        ignoreCompilerErrors: false,
        experimentalDecorators: true,
        version: true
    }));
}
