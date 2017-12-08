const {dev} = require("./common");

module.exports = dev
    ? [
        {
            test: /\.(ttf|otf|eot|woff|svg)$/,
            exclude: /images/,
            use: [
                {
                    loader: "file-loader"
                }
            ]
        }
    ]
    : [
        {
            test: /\.(ttf|otf|eot|woff|svg)$/,
            exclude: /images/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: "../",
                        outputPath: "fonts/"
                    }
                }
            ]
        }
    ];