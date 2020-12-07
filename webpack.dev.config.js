const path = require( 'path' )
const webpack = require( 'webpack' )


module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: [
    './src/index'
  ],
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'bundle.js',
    // publicPath: '/',
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve( __dirname, 'src' )],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader?resolve url'
        ],
        include: [path.join( __dirname, 'src' )]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|otf|woff|eot)$/,
        loader: 'url-loader?importLoaders=1&limit=10000000',
        include: path.join( __dirname, 'src' )
      },
      {
        test: /\.(jpg|jpeg|svg|png)$/,
        loader: 'url-loader?importLoaders=1&limit=10000000'
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve( __dirname, 'public' ),
      path.resolve( __dirname, 'src' )
    ],
    extensions: [ '.tsx', '.ts', '.js' ],
  }
};
