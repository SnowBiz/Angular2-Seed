/**
 *
 */

'use strict'
namespace Tools.Gulpfile {
  const { dest, parallel, series, src, watch} = require('gulp')
  const plug = require('gulp-load-plugins')({ lazy: true })

  exports.buildDocs = parallel(buildDocs)

  exports.build = series(
    parallel(
      lintScripts,
      series(compileTypeScript, bundle, minify)
    )
  )

  exports.serve = series(
    parallel(
      lintScripts,
      series(compileTypeScript, bundle)
    ),
    parallel(observer, serve)
  )

  /**
   *
   * todo(refactor):
   *  - all the functions below should be given new homes and names.
   *  - the main purpose of this file should be to import
   *    task functions and assign them to our gulp
   *    commands called by the gulp-cli.
   *
   *  - task file exports:
   *      - exports.clean      = function  clean{__filename}() {} : clean dest's of built file types
   *      - exports.clone      = function  clone{__filename}() {} : copy dependencies to dest
   *      - exports.check      = function  check{__filename}() {} : run any linters
   *      - exports.build      = function  build{__filename}() {} : generate a build artifact
   *      - exports.serve      = function  serve{__filename}() {} : start up a local serve
   *      - exports.watch      = function  watch{__filename}() {} : observer callbacks for file changes
   *
   *    working on how to handle these, lets leave out for now.
   *      - exports.buildSpecs = function  buildSpecs{__filename}() {} : generate specs artifact
   *      - exports.watchSpecs = function  buildSpecs{__filename}() {} : observer callbacks for spec files
   *
   *  - example:
   *      function cleanStyles() {
   *        ...
   *      }
   *      export.start = cleanStyles
   *
   */

  const tsProject = plug.typescript.createProject('tsconfig.json')
  function compileTypeScript() {
    return src(['src/**/*.ts'])
      .pipe(plug.debug())
      .pipe(plug.sourcemaps.init())
      .pipe(plug.typescript(tsProject))
      .pipe(plug.sourcemaps.write('.'))
      .pipe(dest('tmp/serve'))
  }

  function bundle() {
    const Builder = require('jspm').Builder
    const builder = new Builder()

    return builder
      .buildStatic('tmp/serve/client.js', 'tmp/serve/bundle.js')
      .catch(error => console.log(error))
  }

  function minify() {
    return src(['tmp/serve/bundle.js'])
      .pipe(plug.uglify())
      .pipe(dest('tmp/serve'))
  }

  function observer(neverDone) {
    watch(['src/**/*.ts'], series(compileTypeScript, bundle))
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
    return src(['src/**/*.ts'])
      .pipe(plug.tslint({ tslint: require('tslint') }))
      .pipe(plug.tslint.report('verbose'), {
        emitError: false,
        summarizeFailureOutput: true
      }).on('error', () => nextTask())
  }

  const path = require('path')
  function buildDocs() {
    let docsSrc = [
      'src/**/*.ts',
    ];

    let APP_TITLE = 'title'
    let DOCS_DEST = 'docs'

    return src(docsSrc)
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
}