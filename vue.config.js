module.exports = {
    configureWebpack: {
        devtool: 'source-map'
      },
      devServer: {
        proxy: {
          '/users': {
            target: 'http://localhost:8080',
            ws: true,
            changeOrigin: true
          }
        }
      }
}
