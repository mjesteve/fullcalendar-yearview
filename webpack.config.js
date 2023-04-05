const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
//https://github.com/midudev/webpack-paso-a-paso-live-coding/blob/master/webpack.config.js
const HtmlWebpackPugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    devtool: "sourcemap",
    devServer: {
        port: 9000,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [

        //new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),

        // FullCalendar uses '@fullcalendar/core' as a module name in the ES6 module system but
        // 'FullCalendar' in the compiled ES5 file
        new ReplaceInFileWebpackPlugin([{
            dir: 'dist',
            //files: ['main.[contenthash].js'], //not working
            //test: /\.js$/, //working
            files: ['main.js'],
            rules: [{
                search: /@fullcalendar\/core/g,
                replace: 'FullCalendar'
            }]
        }]),
        
        new HtmlWebpackPugin({
            //template: path.resolve(__dirname, 'src', 'index.html'),
            template: 'src/index.html',
            filename: "index.html",
            inject: false
        }),
    ],
    optimization: {
        minimize: false
    },
    externals: /(fullcalendar|moment)/i,
    output: {
        library: "FullCalendarYearView",
        libraryTarget: "var",
        globalObject: "this",
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
};
