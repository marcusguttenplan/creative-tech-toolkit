const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:3000/',
            './src/js/main.js'
        ],
        nav: [
            'webpack-dev-server/client?http://localhost:3000/',
            './src/js/nav.js'
        ]
    },

    target: "web",

    output: {
        filename: 'js/[name].js',
        sourceMapFilename: '[name].js.map',
        path: path.resolve(__dirname, 'dist')
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            // {
            //     test: /\.html?$/,
            //     loader: "file-loader?name=[name].[ext]"
            // },
            // {
            //     test: /\.(jpg|png|svg)$/,
            //     use: [{
            //         loader: "url-loader",
            //         options: {
            //             limit: 8000,
            //             name: "img/[name].[ext]"
            //         }
            //     }]
            // },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/main.css",
            chunkFilename: "css/[id].css"
        }),
        new CopyWebpackPlugin([
            {
                context: './src',
                from: '**/*.html',
            },
            {
                context: './src',
                from: 'img/**',
                toType: 'dir'
            },
            {
                context: './src',
                from: 'fonts/**',
                toType: 'dir'
            },
            {
                context: './src',
                from: 'js/vendor/**',
                toType: 'dir'
            },
            {
                context: './src',
                from: 'css/vendor/**',
                toType: 'dir'
            }
        ]),
        // new HtmlWebpackPlugin({
        //     inject: false,
        //     hash: true,
        //     template: './src/index.html',
        //     filename: 'index.html'
        // })
    ]
}
