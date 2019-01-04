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

Deploying
---

Trying it out
---

Customizing the login page
---


Notes
---

