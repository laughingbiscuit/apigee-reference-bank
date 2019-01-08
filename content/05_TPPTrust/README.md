Trusting Third Parties
---

In order to give a third party access to our APIs, they must register their App. For simple APIs, this is performed in a Developer Portal, however for Open Banking it is more common to allow registration via API so that third parties can register with many banks in one go. We call API-based approach "Dynamic Registration".

API Products
---

An API Product is a collection of API Proxies that can be used to Publish your APIs and manage access controland Monetization. An example of how API Products may be structured could be:

|| Product Name				| Environment(s)| API Proxies		|	Quota			| Visibility	||
| Open Data Sandbox			| sandbox		| atms-v1, branches-v1, products-v1	| 100pm | public - auto approval	|
| Open Data Production		| prod			| atms-v1, branches-v1, products-v1	| 1000pm | public - manual approval	|
| Account Info Sandbox		| sandbox		| identity-v1, accounts-v1	| 100pm | public - auto approval	|
| Account Info Production	| prod			| identity-v1, accounts-v1	| 1000pm | public - manual approval	|
| Payments Sandbox			| sandbox		| identity-v1, payments-v1	| 100pm | public - auto approval	|
| Payments Production		| prod			| identity-v1, payments-v1	| 1000pm | public - manual approval	|
| Currency Exchange Sandbox | sandbox		| identity-v1, forex-v1		| 100pm	| private - approved partners only	|
| Currency Exchange Starter	| prod			| identity-v1, forex-v1		| Post Pay| private - approved partners only	|
| Currency Exchange Enterprise| prod		| identity-v1, forex-v1		| Pre Pay| private - approved partners only |
| Internal CRM APIs			| sandbox, prod	| crm-v1					| unlimited  | internal only	|


Developer Apps
---
A Developer App represents a client application, such as the 'Cool Accounting Android App'. In general each app will have a unique set of credentials which it will use for all API Products that it accesses. Custom Attributes can be attached to these Apps, such as whether an Application is an Account Information Service Provider (AISP) or a Payment Initiation Service Provider (PISP).

Developers
---
A Developer is a user that creates many Developer Apps in order to consume APIs. They can administer their credentials and view App Analytics by logging into the Developer Portal. 

Companies
---
In the case that many developers need to administer one or many shared Developer Apps, we can create a Company to group these developers. This also allows them to share payment methods when accessing monetized APIs.

Dynamic Registration
---
For a typical API Platform, Third Party Developers would register to use the APIs using a Developer Portal. You may have followed this process when accessing Google Maps APIs in the past.

Whilst this is sufficient for a single API Provider that only required a Client ID and Secret, the Open Banking ecosystem is a little more complex. A third party that wants to make payments for customers using every European bank would not want to manually register on hundreds of Developer Portals. In addition, the developer experience of managing Client Certificates through a browser can be a little clunky. The solution to this is to allow third parties to register their Developer Apps using an API that has been standardized across all banks. We call this 'Dynamic Registration' and is an API Facade that orchestrates calls betweeen the Apigee Management APIs and an Identity and Access Management system.

Mutual TLS
---

eIDAS
---

SCIM
---

CRL
---


----

ref to: https://github.com/yuriylesyuk/eidas-x509-for-psd2
