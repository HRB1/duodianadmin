module.exports = {
    devServer: {
        host: 'localhost',
        proxy: {
            "/api": {
                target: 'http://127.0.0.1:7002',
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: ['./src/static/style/common.scss','./src/static/style/_mixin.scss']
                })
                .end()
        })
    }
}
