/**
 *
 * gulpfile.ts
 *
 */

'use strict'
namespace Tools.Gulpfile {
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
}