const apickli = require('apickli')
const {
  Before,
  Given,
  setDefaultTimeout
} = require('cucumber')
const fs = require('fs')
const org = process.env.APIGEE_ORG
const env = process.env.APIGEE_ENV

Before(function() {
  this.apickli = new apickli.Apickli('https',
    org + '-' + env + '.apigee.net')
  this.apickli.fixturesDirectory = './test/fixtures'
})

Given('I provide a valid eidas cert', function(cb) {
  fs.readFile(this.apickli.fixturesDirectory + '/eidasCert.txt',
    (err, data) => {
      cb(this.apickli.addRequestHeader('SSL-CLIENT-CERT', data))
    })
})

setDefaultTimeout(60 * 1000)
