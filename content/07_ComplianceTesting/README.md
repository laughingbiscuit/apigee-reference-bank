Compliance Testing
---

Depending on the local regulator, there are different ways of certifying that your APIs are compliant.

Integration Testing
---
Typically, Open API Specifications that conform to regulatory standards can be obtained. As part of your integration testing, you can ensure that each response conforms to this specification. For Apickli tests, this may look like the following:

```cucumber
Feature: 
	As an API Consumer
	I want all responses to conform to the specifications
	So that I have a standard interface across all providers

	Scenario: Successfully get ATM list
		When I GET /atms
		Then response body should be valid according to openapi description ATMs in file swagger.json
```

Conformance Suites
---

It may be that a conformance test suite is provided. For APIs built against the OBIE specifications, this can be found [here](https://fintechlabs-fapi-conformance-suite.fintechlabs.io/)

Steps for conformance:
- Deploy this accelerator
- Integrate APIs with production services
- Configure [TLS](https://docs.apigee.com/api-platform/system-administration/configuring-ssl-cloud-based-edge-installation.html) on your endpoints, including the use of network and signing certificates used by the conformance suite. These can be obtained as a test ASPSP from the OB Directory
- Register and obtain certificates for a test Third Party Application with the Open Banking Directory and your APIs
- Follow steps found here to run the test suite
- On success, submit your results to the OBIE
