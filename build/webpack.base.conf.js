const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 转换为绝对路径
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
function assetsPath(_path_) {
    let assetsSubDirectory = 'assets';
    return path.posix.join(assetsSubDirectory, _path_)
}


module.exports = {
    entry: {
        app: './src/main.js',//入口文件
    },
    output: {
        path: resolve("dist"),//输出文件路径
        filename: '[name].js', //输出文件名，[name]表示入口文件js名
        //publicPath: 'http://192.168.1.4:132/'
    },
    resolve: {
        // 优化模块查找路径
        modules: [
            path.resolve('src'),
            path.resolve('node_modules') // 指定node_modules所在位置 当你import 第三方模块时 直接从这个路径下搜索寻找
        ],
        //开启后缀名自动补全，指定搜索那些文件
        extensions: ['.js', '.vue', '.json'],
        //配置别名可以加快webpack查找模块的速度
        alias: {
            'vue$': 'vue/dist/vue.esm.js',//末尾添加 $，以表示精准匹配
            '@': resolve('src')
        }
    },
    //模块
    module: {
        // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import')(),
                                require('autoprefixer')({
                                    browsers: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 7-11"]
                                })
                            ]
                        }
                    }
                ],

            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import')(),
                                require('autoprefixer')({
                                    browsers: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 7-11"]
                                })
                            ]
                        }
                    }
                ],
                include: resolve('src'),
                exclude: /node_modules/
            },
            {
                test: /\.js$/, //处理以.js结尾的文件
                exclude: /node_modules/, //处理除了nodde_modules里的js文件
                loader: 'babel-loader' //用babel-loader处理
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,// 10KB 以下使用 base64
                    outputPath: 'assets/images/',
                    name: ('[name].[hash:8].[ext]')
                }
            }
        ]
    },
    plugins: [// 对应的插件
        new VueLoaderPlugin(),

    ]
}