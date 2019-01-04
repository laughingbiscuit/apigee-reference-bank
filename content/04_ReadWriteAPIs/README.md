Read Write APIs
---

Once we have an access token, we are now able to access protected APIs such as Accounts and Payments. Our API Proxy will validate the access token.

Implementation
---

Validating an access token in Apigee is easy. The policy is just a few lines long:

``` xml

```

Deploying
---
First lets deploy some protected APIs and then add the above policy to the request flow. You can do this using the UI or run the following commands to build your bundle.

``` bash

```

Testing
---
First lets try to make a request without an access token.

Now lets obtain an access token and make our protected request.

