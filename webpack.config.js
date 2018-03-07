const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = [
    {
        name: "browser",
        entry: {
            bundle: './app/src/js/index.js',
            signup: "./server/views/components/signup-render",
            vendor: [
                'react',
                'react-router'
            ]
        },
        output: {
            path: path.join(__dirname,'/app/static/'),
            filename: 'js/[name].js'
        },
        watch: true,
        resolve: {
            modules: [
                path.resolve("./node_modules"),
                path.resolve("./app/src"),
                path.resolve("./app")

            ],
            alias: {
                "font-awesome-pro" :path.resolve("./node_modules/font-awesome-pro/js/bundles/everything")
            }
        },
        module: {
            loaders: [
                {
                    test: /.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })
                },
                {
                    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: "url-loader?name=./static/fonts/[name].[ext]"
                },
                {
                    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                    use: 'file-loader?name=./static/fonts/[name].[ext]'
                }
            ]
        },
        devtool: 'source-map',
        plugins: [
          new ExtractTextPlugin({

                filename: "css/index.css",
                allChunks: true
            }),
          new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8080/',
                files: ["index.html"]
            })
        ]
    },

    {
        name: "server-side rendering",
        target: "node",
        entry: {
            app: "./server/views/components/app",
            signup: "./server/views/components/signup"
        },
        watch:false,
        watchOptions: {
          ignored: "app/*"
        },
        output: {
            path: path.join(__dirname,'/server/views/components/built'),
            filename: '[name].js',
            libraryTarget: "commonjs2"
        },
        resolve: {
            modules: [
                path.resolve("./node_modules"),
                path.resolve("./app/src"),
                path.resolve("./app")
            ]
        },

        module: {
            loaders: [
                {
                    test: /.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    })
                },
                {
                    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: "url-loader?name=./static/fonts/[name].[ext]"
                },
                {
                    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                    use: 'file-loader?name=./static/fonts/[name].[ext]'
                }
            ]
        },
        devtool: 'source-map',
        plugins: [
          new ExtractTextPlugin({
                filename: "./app/static/css/index.css",
                allChunks: true
          })
        ]
    }
]
