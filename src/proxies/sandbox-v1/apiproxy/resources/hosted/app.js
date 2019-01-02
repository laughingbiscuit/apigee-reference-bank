var app = require('connect')();
var http = require('http');
var swaggerTools = require('swagger-tools');

var serverPort = process.env.PORT || 9000;

// swaggerRouter configuration
var options = {
  useStubs: true 
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var swaggerDoc = require('./swagger.json');

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Error handling
  app.use((err, req, res, next) => {
    res.statusCode = 400
    res.end(JSON.stringify({
        error: err.paramName + ": " + err.code
    }))
  })

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  });
});
