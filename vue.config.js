module.exports = {
  devServer: {
    // proxy: 'http://localhost:3000',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/upload': {
        target: 'http://localhost:3000'
      }

    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "common": "@/common",
        "components": "@/components",
        "network": "@/network",
        "views": "@/views"
      }
    }
  },
  // 代理
}
