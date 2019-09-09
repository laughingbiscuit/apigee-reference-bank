const app = require('connect')()
const http = require('http')
const swaggerTools = require('swagger-tools')
const serverPort = process.env.PORT || 9000
const specification = require('./swagger.json')

swaggerTools.initializeMiddleware(specification, function(middleware) {
  app.use(middleware.swaggerMetadata())
  app.use(middleware.swaggerValidator())

  app.use(middleware.swaggerRouter({
    useStubs: true
  }))

  http.createServer(app).listen(serverPort)
})
