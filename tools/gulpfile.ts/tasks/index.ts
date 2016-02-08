/**
 *
 */

'use strict'

module Gulpfile.Tasks {
  const { src, dest, parallel, series } = require('gulp')

  const assets = require('./assets')
  const images = require('./images')
  const partials = require('./partials')
  const scripts = require('./scripts')
  const styles = require('./styles')
  const timer = require('./timer')
  const watch = require('./watch')
  const docs = require('./docs')
  const serve = require('../servers')

  exports.build = series(
    parallel(
      scripts.build
    )
  )

  exports.serve = series(
    parallel(
      scripts.check,
      scripts.build
    ),
    parallel(watch, serve)
  )
}