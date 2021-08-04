const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/app.js') ,
    module: {
        rules: [
          { test: /\.html$/i,loader: "html-loader"},
          { test: /\.svg$/, use: 'svg-inline-loader' },
          { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
         
        ]
      },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    }
}