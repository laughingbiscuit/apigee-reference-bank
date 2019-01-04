Identity
---

The APIs we have deployed so far have all been public as ATMs, Branches and Product Information are not specific to a given user. In order to access Account and Payment information we will need to identify, authenticate and authorize a user on behalf of a third party application.

It is generally considered that Identity is the most complex part of an Open Banking API Implementation.

Regulation
---

CMA / Open Banking Implementation Entity
---
- "Customers who are satisfied about privacy and security safeguards, and are willing to give consent, will be able to share their own transaction data with trusted intermediaries, which can then offer advice tailored to the individual customer" (168)
- The Open Banking Implementation Entity recommend the use of the Open ID Connect, specifically using the F-API Profile

PSD2 / Berlin Group
---
- "The obligation to keep personalised security credentials safe is of the utmost importance to protect the funds of the payment service user and to limit the risks relating to fraud and unauthorised access to the payment account". As such, it is vital to use the correct OAuth 2 grant type to ensure that user credentials are not exposed to third party apps, and that client credentials are stored securely. (Article 1.69)
- "The security measures should be compatible with the level of risk involved in the service". For example, it would not make sense to require multi-factor authentication for an ATM Location API. (Article 1.96)
- Strong authentication in the context of PSD2 refers to Multi-Factor authentication. (Article 4.30). It is required (Article 97) when a customer:
	- accesses its payment account online
	- initiates an electronic payment transaction
	- carries out any action through a remote channel which may imply a risk of payment fraud or other abuses
- Article 64 discusses the issuing and revoking of customer consent. 

- The Berlin Group have proposed 3 authentication flows
	- Redirect flow
	- Decoupled flow
	- Embedded flow

User Journey
---

Flow
---
(flow diagram here)

Deploying
---

Trying it out
---

Client Credentials
---

Please reference the test file `Identity-ClientCredentials.feature` to learn how to obtain a client credentials access token. 


Authorization Code
---

Navigate to `https://(org)-(env).apigee.net/mock-iam/v1/authorize?client_id=123456789&redirect_uri=https%3A%2F%2Fexample.com&response_type=code&scope=openid%20accounts` in your browser

Token
---
Please reference the test file `Identity-Authorize.feature` to learn how to obtain an access token for a user.

Customizing the login page
---

This sample login page is built using Node JS and it hosted in Apigee for demonstrating purposes. In production you will replace this with your own IDP. Explore the Mock IDP in the ./src/mocks/mock-iam-v1

Notes
---

