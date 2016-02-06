'use strict'

const gulp = require('gulp')
const plug = require('gulp-load-plugins')({ lazy: true })

var minimist = require('minimist');
var analytics = require('./tools/analytics/analytics');

var cliArgs = minimist(process.argv.slice(2));

if (cliArgs.projects) {
  // normalize for analytics
  cliArgs.projects.split(',').sort().join(',');
}

gulp.task('doc', gulp.parallel(buildDocs))

gulp.task('build', gulp.series(
  gulp.parallel(
    lintScripts,
    gulp.series(compileTypeScript, bundle, minify)
    )
  ))

gulp.task('serve', gulp.series(
  gulp.parallel(
    lintScripts,
    gulp.series(compileTypeScript, bundle)
    ),
  gulp.parallel(watch, serve)
  ))

const tsProject = plug.typescript.createProject('tsconfig.json')
function compileTypeScript() {
  return gulp.src(['src/**/*.ts'])
    .pipe(plug.debug())
    .pipe(plug.sourcemaps.init())
    .pipe(plug.typescript(tsProject))
    .pipe(plug.sourcemaps.write('.'))
    .pipe(gulp.dest('tmp/serve'))
}

function bundle() {
  const Builder = require('jspm').Builder
  const builder = new Builder()

  return builder
    .buildStatic('tmp/serve/client.js', 'tmp/serve/bundle.js')
    .catch(error => console.log(error))
}

function minify() {
  return gulp.src(['tmp/serve/bundle.js'])
    .pipe(plug.uglify())
    .pipe(gulp.dest('tmp/serve'))
}

function watch(neverDone) {
  gulp.watch(['src/**/*.ts'], gulp.series(compileTypeScript, bundle))
}

const browserSync = require('browser-sync').create()
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
  })
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
    }).on('error', () => nextTask())
}

const path = require('path')
function buildDocs() {
  let src = [
    'src/**/*.ts',
  ];

  let APP_TITLE = 'title'
  let DOCS_DEST = 'docs'

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

var firstTask = true;
gulp.on('task_serve', (e) => {
  if (firstTask) {
    firstTask = false;
    analytics.buildSuccess('gulp <startup>', process.uptime() * 1000);
  }

  analytics.buildStart('gulp ' + e.task)
});
gulp.on('task_stop', (e) => {analytics.buildSuccess('gulp ' + e.task, e.duration * 1000)});
gulp.on('task_err', (e) => {analytics.buildError('gulp ' + e.task, e.duration * 1000)});