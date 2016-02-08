/**
 *
 */
namespace Tools.Gulpfile {

  const { dest, series, src, watch } = require('gulp')
  const plug = require('gulp-load-plugins')({ lazy: true })
  const tsProject = plug.typescript.createProject('tsconfig.json')

  interface IPipeline {
    clean: any
    build: any
    watch: any
  }

  class ScriptsPipeline implements IPipeline {
    private src() {
      switch (process.env.$$_CONFIGURATION) {
        case process.env.$$_VARS_DEBUG:
        case process.env.$$_VARS_RELEASE: return ['src/**/*.ts']
      }
      return null
    }

    private dest() {
      switch (process.env.$$_CONFIGURATION) {
        case process.env.$$_VARS_DEBUG: return process.env.$$_SETTINGS_DEBUG_OUTDIR
        case process.env.$$_VARS_RELEASE: return process.env.$$_SETTINGS_RELEASE_OUTDIR
      }
      return null
    }

    public clean = function cleanScripts() {

    }


    public watch = function watchScripts() {
      watch(['src/**/*.ts'], series(this.build))
    }

    public clone = function cloneScripts() { }

    public check = function checkScripts(nextTask) {
      return src(['src/**/*.ts'])
        .pipe(plug.tslint({ tslint: require('tslint') }))
        .pipe(plug.tslint.report('verbose'), {
          emitError: false,
          summarizeFailureOutput: true
        }).on('error', () => nextTask())
    }

    private minifyScripts = function minify() {
      return src(['tmp/serve/bundle.js'])
        .pipe(plug.uglify())
        .pipe(dest('tmp/serve'))
    }

    private bundleScripts = function bundle() {
      const Builder = require('jspm').Builder
      const builder = new Builder()

      return builder
        .buildStatic('tmp/serve/client.js', 'tmp/serve/bundle.js')
        .catch(error => console.log(error))

    }

    private compileTypeScript = function compileTypeScript() {
      return src(['src/**/*.ts'])
        .pipe(plug.debug())
        .pipe(plug.sourcemaps.init())
        .pipe(plug.typescript(tsProject))
        .pipe(plug.sourcemaps.write('.'))
        .pipe(dest('tmp/serve'))
    }

    public build = series(this.compileTypeScript, this.bundleScripts)
  }

  module.exports = new ScriptsPipeline()
}