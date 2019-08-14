const webpack = require('webpack')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
    devtool: '#eval-source-map',
    //配置此静态文件服务器，可以用来预览打包后项目
    devServer: {
        inline: true,//打包后加入一个websocket客户端
        hot: true,//热加载
        contentBase: path.join(__dirname, "..", "dist"), //静态文件根目录
        port: 3000, // 端口
        host: 'localhost',
        overlay: true,
        compress: false // 服务器返回浏览器的时候是否启动gzip压缩
    },
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫秒内重复保存不打包
        poll: 1000 //每秒询问的文件变更的次数
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src', 'index.html'),
            filename: 'index.html',
            // vendor: './vendor.dll.js', //与dll配置文件中output.fileName对齐
            hash: true,//防止缓存
            // minify:{
            // removeAttributeQuotes:true//压缩 去掉引号
            // }
        }),
        new webpack.HotModuleReplacementPlugin(), //HMR
        new webpack.NamedModulesPlugin(), // HMR
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
        })
    ]
})

module.exports = devWebpackConfig