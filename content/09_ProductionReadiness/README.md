Production Readiness
---

Monitoring
---
It is important to form a monitoring strategy for your APIs. Please refer to the followng link for [Apigee Best Pratice](https://community.apigee.com/articles/17862/forming-an-api-monitoring-strategy-where-to-start.html)

Logging
---
Logging in Apigee can be implemented using the following policies:
- [Message Logging Policy](https://docs.apigee.com/api-platform/reference/policies/message-logging-policy)
- [Service Callout](https://docs.apigee.com/api-platform/reference/policies/service-callout-policy)
- [Callouts](https://docs.apigee.com/api-platform/reference/policies/javascript-policy) such as custom Java, JS or Python

CI/CD
---
You may have noticed that in this accelerator, every time we have shown you how to do something manually in the UI, we have also provided an automated way to do this. 

There is a great example of Continuous Integration using Jenkins in [this](https://github.com/seymen/accelerator-ci-maven) repository. This will give you an example of an Apigee implementation using Git, Maven, Unit Testing, Linting, Integration Testing and Continuous Deployment.

