Read Write APIs
---

Once we have an access token, we are now able to access protected APIs such as Accounts and Payments. Our API Proxy will validate the access token.

Implementation
---

Validating an access token in Apigee is easy. The policy is just a few lines long, and will throw an error if an invalid, expired or revoked token is provided. In addition, it populates related Product, Developer, App and Token attributes as variables for use elsewhere in our API Proxy. You can read more about the policy [here](https://docs.apigee.com/api-platform/security/oauth/using-access-tokens).

``` xml
<OAuthV2 name="OAuth2.VerifyAccessToken">
	<Operation>VerifyAccessToken</Operation>
</OAuthV2>

```

Deploying
---
First lets deploy some protected APIs and then add the above policy to the request flow. You can do this using the UI or run the deploy.sh command in the bundle.


Testing
---
First lets try to make a request without an access token. Note that you will observe a 404 error.

Now lets obtain an access token and make our protected request.

