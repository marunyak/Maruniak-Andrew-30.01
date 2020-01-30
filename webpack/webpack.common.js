const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    //'babel-polyfill',
    entry: ['./src/js/index.js'],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: [/.js$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use:  ['style-loader', 'css-loader']
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '...',
            template: './public/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new CleanWebpackPlugin()
    ],
    devtool: "eval",
    devServer: {
        open: true
    }
};
