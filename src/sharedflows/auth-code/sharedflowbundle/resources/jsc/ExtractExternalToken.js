var response = JSON.parse(context.getVariable('callout.content'))
context.setVariable('custom.accessToken', response.accessToken)
context.setVariable('oauth_external_authorization_status', true)
context.setVariable('custom.responseType', 'code')
