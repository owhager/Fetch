const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      mode: 'development', // or 'production'
      entry: './src/index.jsx',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
             test: /\.(png|svg|jpg|jpeg|gif)$/i,
             type: 'asset/resource',
          },
          {
            test: /\.(js|jsx)$/, // Apply the rule to JS and JSX files
            exclude: /node_modules/, // Exclude node_modules
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'], // Allow imports without specifying extensions
      },
      plugins: [new HtmlWebpackPlugin({
        template: './dist/index.html'
      })],
      devServer: {
        static: './dist',
      },
    };