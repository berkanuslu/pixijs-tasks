const path = require('path');

module.exports = {
	mode: 'development',
	context: __dirname,
	entry: {
		main: './src/index.js',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.png$/,
				loader: 'file-loader',
			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.min.js'],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
		compress: true,
		port: 9000
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	}
};