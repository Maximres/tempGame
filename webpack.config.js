const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'screens/landing': './src/screens/landing/landing.js',
    'screens/battle': './src/screens/battle/app.js',
    'components/popup': './src/components/popup/popUp.js',
    'components/gameEnder': './src/components/gameEnder/gameEnder.js',
    'components/healthBar': './src/components/healthBar/healthBar.js',
    'components/tasks/math': './src/components/tasks/math/math.js',
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: '[name]/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/style.css',
    }),
    new HtmlWebPackPlugin({
      inject: true,
      chunks: ['screens/landing'],
      template: `${__dirname}/src/screens/landing/index.html`,
      filename: './screens/landing/index.html',
    }),
    new HtmlWebPackPlugin({
      inject: true,
      chunks: ['screens/battle'],
      template: `${__dirname}/src/screens/battle/index.html`,
      filename: './screens/battle/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/screens/battle/battle.css',
        to: 'screens/battle/battle.css',
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/screens/battle/img',
        to: 'screens/battle/img',
      },
    ]),
  ],
};
