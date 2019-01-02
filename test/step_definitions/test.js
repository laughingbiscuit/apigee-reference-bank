const apickli = require('apickli')
const { Before } = require('cucumber')

Before(function() {
    this.apickli = new apickli.Apickli('https', 'emea-poc9-test.apigee.net/')
    this.apickli.addRequestHeader('Cache-Control', 'no-cache')
    this.apickli.storeValueInScenarioScope('clientId', 'XAsT7MGz9GoGPvpp8UqjnTw0JIcIekUA')
    this.apickli.storeValueInScenarioScope('clientSecret', 'CCFG3f0OavXoA1we')
    this.apickli.storeValueInScenarioScope('loginClientId', '06lyw0DWnyygJAYcNEVjQ3sidt5An7Sv')
    this.apickli.storeValueInScenarioScope('loginClientSecret', 'DnLF4vETbAtbrx7y')
    this.apickli.storeValueInScenarioScope('redirectUri', 'https://httpbin.org/get')
    this.apickli.storeValueInScenarioScope('unique', new Date().getTime())
})
