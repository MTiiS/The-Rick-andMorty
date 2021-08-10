const path = require('path');

module.exports = {
    mode : 'development',
    entry: path.resolve(__dirname, 'src/js/app.js') ,
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
    },
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