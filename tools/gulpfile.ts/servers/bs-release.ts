module Gulpfile.Servers {

  module.exports = {
    files: [
      'dist/**/*.{css,html,js}'
    ],
    server: {
      baseDir: [
        'dist'
      ]
    }
  }

}