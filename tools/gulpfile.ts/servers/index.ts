module Gulpfile.Tasks {
  const browserSync = require('browser-sync').create()
  function serve() {
    browserSync.init(require('../servers/bs-debug'))
  }
 module.exports = serve
}