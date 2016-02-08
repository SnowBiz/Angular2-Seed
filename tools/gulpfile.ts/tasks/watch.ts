module Gulpfile.Tasks {

  const scripts = require('./scripts')

  function watch(neverDone) {
    scripts.watch()
  }

  module.exports = watch

}
