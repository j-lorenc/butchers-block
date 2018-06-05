const webpack = require("webpack");
const path = require("path");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

module.exports = [{
	name:"browser",
	mode:"development",
    entry: {
        bundle: './app/src/js/index.js'     
    },
    output: {
		path: path.join(__dirname,'/app/static/'),
		filename: 'js/[name].js'
    },
	optimization: {
	   splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all"
				}
			}
		}
	},
	watch:true,
    resolve:{
        modules: [
            path.resolve("./node_modules"),
            path.resolve("./src"),
            path.resolve(".")
            
        ],
		alias: {
			"font-awesome-pro" :path.resolve("./node_modules/font-awesome-pro/js/bundles/everything")
		}  
    },
	module: {
		rules: [
			{
                test: /\.html$/,
                use: 'raw-loader'
            },
			{
				test: /\.(js||jsx)$/,
				exclude: '/node_modules/',
				use: [{
					loader: 'babel-loader'
				},{
					loader: 'eslint-loader'
				}]

			}, 
			{
				test: /\.(scss||css)$/,
			  	use: [
				{
					loader:"style-loader"		
				},     
				{
					loader:"css-loader",
					options: {
                    	sourceMap: true,
						modules: true
	                }
				},
				{
					loader: "sass-loader",
					options: {
                    	sourceMap: true
                	}
				}]
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: "url-loader?name=/assets/fonts/[name].[ext]"
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: 'file-loader?name=./static/fonts/[name].[ext]'
			}
		]
	},
    devtool: 'source-map',
	plugins : [
        new MiniCssExtractPlugin({
	    	filename: `css/[name].css`
		})
  	],
    
}, 
{
	name:"server",
	target: "node",
	mode:"development",
	entry: {
		server: "./server/bin/www"
	},
	context: path.resolve(__dirname),
	externals:[nodeExternals()],
	watch:false,
	output: {
		path: path.join(__dirname,'/server/bin/'),
		filename: '[name].js'
    },
	watch:true,
    resolve:{
        modules: [
            path.resolve("./node_modules"),
            path.resolve("./src"),
            path.resolve(".")
            
        ]  
    },
	node: {
    	__dirname: true,
    	__filename: true
	},
	module: {
		rules: [
			{
                test: /\.html$/,
                use: 'raw-loader'
            },
			{
				test: /\.(js||jsx)$/,
				exclude: '/node_modules/',
				use: [{
					loader: 'babel-loader', 
					options: {
						env:"server"
					}
				},{
					loader: 'eslint-loader'
				}]

			},
			{
				test: /\.(scss||css)$/,
				use: "null-loader"
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
	plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/',
        files: ["index.html"]
      }),
	  new MiniCssExtractPlugin({
	    	filename: `css/[name].css`
	  })
		
    ]
	
	
}]