// parse payload
var response = JSON.parse(context.getVariable('response.content'))
var org = context.getVariable('organization.name')
var mgmtUrl = 'https://api.enterprise.apigee.com/v1'
var defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + ''
}

// create developer 
var developerRequest = new Request(mgmtUrl +
    '/o/' + org +
    '/developers',
    'POST',
    defaultHeaders,
    JSON.stringify({
        email: response.developerEmail,
        firstName: response.developerFirstName,
        lastName: response.developerLastName,
        userName: response.developerEmail,
        attributes: []
    })
)

var developerExchange = httpClient.send(developerRequest)
developerExchange.waitForComplete()

//create app
var appRequest = new Request(mgmtUrl +
    '/o/' + org +
    '/developers/' + response.developerEmail +
    '/apps',
    'POST',
    defaultHeaders,
    JSON.stringify({
        name: response.appName,
        attributes: [],
        scopes: response.scope,
        callbackUrl: response.redirect_uris[0]
    }))

var appExchange = httpClient.send(appRequest)
appExchange.waitForComplete()

// create keypair
var keyRequest = new Request(mgmtUrl +
    '/o/' + org +
    '/developers/' + response.developerEmail +
    '/apps/' + response.appName +
    '/keys/create',
    'POST',
    defaultHeaders,
    JSON.stringify({
        key: response.client_id,
        secret: response.client_secret
    }))

var keyExchange = httpClient.send(keyRequest)
keyExchange.waitForComplete()

// associate it with products
var productRequest = new Request(mgmtUrl +
    '/o/' + org +
    '/developers/' + response.developerEmail +
    '/apps/' + response.appName +
    '/keys/' + response.client_id,
    'POST',
    defaultHeaders,
    JSON.stringify({
        apiProducts: ['Open Banking APIs']
    }))

var productExchange = httpClient.send(productRequest)
productExchange.waitForComplete()

// remove previous key?
