const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {

    app.use(
        '/userroute',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      ),
      app.use(
        '/books',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      ,
      app.use(
        '/card',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      ,
      app.use(
        '/genre',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
      ,
      
      app.use(
        '/author',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      )
    
    
    
      
    
    



    
}