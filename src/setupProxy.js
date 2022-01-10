// setupProxy.js
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api/**', {  //`api`是需要转发的请求 
      target: 'http://127.0.0.1:8083',  // 这里是接口服务器地址
      changeOrigin: true,
    })
  )
}