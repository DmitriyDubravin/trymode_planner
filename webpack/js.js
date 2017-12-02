const {dev} = require("./common");

module.exports = dev
    ? [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader"
                }
            ]
        }
    ]
    : [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader"
                }
            ]
        }
    ];