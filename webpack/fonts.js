const {dev} = require('./common');

module.exports = dev
? null
: [
	{
		test: /\.(eot|svg|ttf|woff)$/,
		exclude: /images/,
		use: [
			{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					publicPath: '..',
					outputPath: '/images/',
				}
			}
		]
	}
];