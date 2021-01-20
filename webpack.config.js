const path = require('path');
const webpack = require('webpack')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	entry: './index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index.js',
		libraryTarget: "umd",
		library: "vega-widgets"
	},
	externals: {
			react: {
				root: "React",
				commonjs2: "react",
				commonjs: "react",
				amd: "react",
				umd: "react",
			},
			"react-dom": {
				root: "ReactDOM",
				commonjs2: "react-dom",
				commonjs: "react-dom",
				amd: "react-dom",
				umd: "react-dom",
		}
	},
	plugins: [
		new webpack.ProgressPlugin(),
	],
	module: {
		rules: [
		{
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'),
			use: {
			loader: 'babel-loader'
			},
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
		new TerserPlugin({
			parallel: true,
			cache: true,
			sourceMap: true,
			terserOptions: {
			format: {
				comments: false,
			},
			},
			extractComments: false,
		})
		],
	},
};