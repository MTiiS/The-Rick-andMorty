const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/app.js') ,
    module: {
        rules: [
          { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
      },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    }
}