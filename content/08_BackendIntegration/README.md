Backend Integration
---

Southbound TLS
---

Between Apigee and your backends, you will want to secure communicating using Mutual-TLS. A guide can be found [here](https://docs.apigee.com/api-platform/system-administration/configuring-ssl-edge-backend-service.html). 

IP Whitelisting
---
For a cloud installation, NAT IP Addresses of Apigee components can be obtained for the support team while can be whitelisted on your firewalls. For an On Premise installation, please contact your operations team to understand your set up.

Mediation
---

It is common for a RESTful JSON API to be exposed from the API Management Platform while connecting to SOAP Services. Eventually, you will migrate all middleware services to microservices in kubernetes, but until then you can use the following policies:
- [JSON to XML](https://docs.apigee.com/api-platform/reference/policies/json-xml-policy) / [XML to JSON](https://docs.apigee.com/api-platform/reference/policies/xml-json-policy)
- [XSL Transform](https://docs.apigee.com/api-platform/reference/policies/xsl-transform-policy)
- [Callouts](https://docs.apigee.com/api-platform/reference/policies/javascript-policy) such as custom Java, JS or Python

Orchestration
---

Apigee often acts as a Facade, exposing a single API for a number of different backend calls. This can be achieved using the following policies:
- [Service Callout](https://docs.apigee.com/api-platform/reference/policies/service-callout-policy)
- [Callouts](https://docs.apigee.com/api-platform/reference/policies/javascript-policy) such as custom Java, JS or Python


Error Handling
---

Whilst this may not be strictly mandated by regulation, it is important to provide consistent error messages in order to provide a good developer experience. 

Depending on the complexity of your APIs, there are a number of different approaches. These range from the use of a simple [Raise Fault](https://docs.apigee.com/api-platform/reference/policies/raise-fault-policy) policy, through to the use of [Fault Rules](https://docs.apigee.com/api-platform/fundamentals/fault-handling). I recommend reading [this](https://community.apigee.com/articles/23724/an-error-handling-pattern-for-apigee-proxies.html) article for Apigee Best Practices.
