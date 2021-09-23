const path = require('path');

module.exports = {
  mode:'development',
  devtool:'eval',
  entry:{
    app:'./client.jsx',
  },
  module: {
    rules:[{
      test:/\.jsx$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins:[],
      }
    }]
  },
  output: {
    path: path.join(__dirname,'dist'),
    filename:'app.js',
  }
}

