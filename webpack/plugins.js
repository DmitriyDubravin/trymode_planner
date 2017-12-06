var {dev, prod, pages, extractPlugin} = require("./common");
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// var ManifestPlugin = require('webpack-manifest-plugin');

// var ImageminPlugin = require('imagemin-webpack-plugin').default;
// var ImageminPlugin = require('imagemin-webpack-plugin');

var plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
];
if(dev) {
    let MultiHtmlWebpackPlugin = pages.map(name => 
        new HtmlWebpackPlugin({
            filename: "./dev/" + name + ".html",
            template: "./dev/" + name + ".html",
            showErrors: true,
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: true
            }
        })
    );
    plugins = [
        ...plugins,
        ...MultiHtmlWebpackPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        })
    ];
} else {
    let MultiHtmlWebpackPlugin = pages.map(name =>
        new HtmlWebpackPlugin({
            filename: "./" + name + ".html",
            template: "./" + name + ".html",
            showErrors: true
        })
    );
    plugins = [
        ...plugins,
        ...MultiHtmlWebpackPlugin,
        extractPlugin,
        //		new webpack.SourceMapDevToolPlugin({
        //			filename: './js/main.js.map',
        //		}),
        new webpack.optimize.UglifyJsPlugin(),
        new CleanWebpackPlugin(["prod"], {
            root: path.resolve(__dirname, "../"),
        }),
        new CopyWebpackPlugin([{
            from: "images/**/*",
            to: path.resolve(__dirname, "../prod")
        }]),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
        // , new ImageminPlugin({test: /\.(jpe?g|png|gif|svg)$/i})
    ];
}

module.exports = plugins;