module Gulpfile.Servers {

  module.exports = {
    files: [
      'tmp/serve/**/*.js',
      'src/**/*.{css,html}'
    ],
    server: {
      baseDir: [
        'tmp/serve', 'src', '.'
      ]
    }
  }

}