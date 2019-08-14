const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清空打包目录的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html的插件
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require("purifycss-webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function assetsPath(_path_) {
    let assetsSubDirectory = 'assets';
    return path.posix.join(assetsSubDirectory, _path_)
}

const prodWebpackConfig = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: ('assets/js/[name].js'),
        publicPath: 'http://192.168.1.4:132/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\\/]node_modules[\\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            //new UglifyJsPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src', 'index.html'),
            filename: 'index.html',
            hash: true,
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            }
        }),
        //消除未使用的CSS
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, '../src/*.html')),
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/style/[name].[hash:8].css',
            ignoreOrder: false,
        })

    ]
})
module.exports = prodWebpackConfig