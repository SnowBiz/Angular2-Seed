module Gulpfile.Tasks {

  const path = require('path')
  const scripts = require('./scripts')
  const { src } = require('gulp')

  function buildDocs() {
    let docsSrc = [
      'src/**/*.ts',
    ];

    let APP_TITLE = 'title'
    let DOCS_DEST = 'docs'

    return src(docsSrc)
      .pipe(scripts.plug.typedoc({
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

    exports.buildDocs = buildDocs
}