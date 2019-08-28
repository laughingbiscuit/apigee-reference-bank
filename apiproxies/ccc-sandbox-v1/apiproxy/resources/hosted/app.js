const app = require('connect')()
const http = require('http')
const swaggerTools = require('swagger-tools')
const serverPort = process.env.PORT || 9000
const specification = require('./swagger.json')

swaggerTools.initializeMiddleware(specification, function(middleware) {
  app.use(middleware.swaggerMetadata())
  app.use(middleware.swaggerValidator())

  //custom error handling
  app.use((err, req, res) => {
    res.statusCode = 400
    res.end(JSON.stringify({
      error: (err.type ? err.type : err.paramName + ': ' + err.code)
    }))
  })

  app.use(middleware.swaggerRouter({
    useStubs: true
  }))

  http.createServer(app).listen(serverPort)
})
