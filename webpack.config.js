const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    libraryTarget: "umd",
    library: "vega-widgets"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  externals: {
    'react': 'commonjs react' 
  }
};