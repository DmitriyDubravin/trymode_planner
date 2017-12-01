const {dev} = require('./common');

module.exports = dev
? [
	{
		test: /\.(eot|svg|ttf|woff)$/,
		exclude: /images/,
		use: [
			{
				loader: 'file-loader'
			}
		]
	}
]
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
					outputPath: '/fonts/',
				}
			}
		]
	}
];