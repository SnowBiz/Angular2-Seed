/**
 *
 * gulpfile.ts
 *
 */

'use strict'
namespace Tools.Gulpfile {

  const path = require('path')

  enum CONFIGURATION { DEBUG, RELEASE }

  process.env.cwd = __dirname;
  process.env.$$_CONFIGURATION = CONFIGURATION.DEBUG

  process.env.$$_VARS_DEBUG = CONFIGURATION.DEBUG
  process.env.$$_VARS_RELEASE = CONFIGURATION.RELEASE
  process.env.$$_SETTINGS_DEBUG_OUTDIR = path.join(process.env.cwd, 'tmp/serve')
  process.env.$$_SETTINGS_RELEASE_OUTDIR = path.join(process.env.cwd, 'dist')

  const { task } = require('gulp')
  const {
    build, serve,
    buildDocs
  } = require('./tasks')

  /**
   * Our gulpfile api
   */
  task('build', build)
  task('serve', serve)

  task('docs', buildDocs)

  /**
   * Export our tasks to be used by sibling projects
   */
  exports.build = build
  exports.serve = serve
  exports.buildDocs = buildDocs
}