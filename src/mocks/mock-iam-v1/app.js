// a simple mock oidc idp
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')

const basepath = '/mock-iam/v1'
//const basepath = ''

let mockClient = {
    id: '123456789',
    secret: '12345',
    redirectUri: 'https://example.com'
}
let mockUser = {
    username: 'sean@example.com',
    password: 'password'
}

//client registration

app.get('/authorize', (req, res) => {
    if (req.query.client_id === mockClient.id &&
        req.query.redirect_uri === mockClient.redirectUri &&
        req.query.response_type === 'code' &&
        req.query.scope.indexOf('openid') > -1) {
        res.render('authorize')
    } else {
        res.render('error', {
            valid: {
                clientValid: (req.query.client_id === mockClient.id),
                redirectValid: req.query.redirect_uri === mockClient.redirectUri,
                responseTypeValid: req.query.response_type === 'code',
                scopeValid: req.query.scope.indexOf('openid') > -1
            }
        })
    }
})

app.post('/authorize', (req, res) => {
    if (req.body.username === mockUser.username &&
        req.body.password === mockUser.password) {
        res.status(302).set({
            Location: basepath + '/consent'
        }).send()
    } else {
        res.render('error')
    }
})

app.get('/consent', (req, res) => res.render('consent'))

app.post('/consent', (req, res) => {
    if (req.body.consent) {
        res.status(302).set({
            Location: 'https://httpbin.org/get?code=a' + (new Date()).getTime()
        }).json({})
    } else {
        res.render('error')
    }
})

app.post('/token', (req, res) => res.json({
    accessToken: 't' + (new Date().getTime())
}))

app.listen(process.env.PORT || 9000)
