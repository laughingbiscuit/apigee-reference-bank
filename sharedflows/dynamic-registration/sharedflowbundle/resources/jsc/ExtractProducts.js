var companyApp = JSON.parse(context.getVariable('createCompanyAppResponse.content'))

context.setVariable('custom.apiProducts', JSON.stringify(companyApp.credentials[0].apiProducts.map(x => x.apiproduct)))
