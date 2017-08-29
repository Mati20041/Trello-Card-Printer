const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: path.resolve(__dirname, './frontend/js/app.jsx'),

    output: {
        path: path.resolve(__dirname, './build'),
        filename: "bundle.js",
        publicPath: "/"
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    devServer: {
        inline: true,
        port: 9090,
        contentBase: __dirname + "/build"
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(woff2?|eot|ttf|svg)$/,
                use: ['file-loader']
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("bundle.css"),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'index.html',
            template: './frontend/html/index.html'
        })
    ]
};
