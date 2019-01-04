Open Data Sandbox
---

For our first APIs, we will build some Open Data Sandboxes. This will allow us to understand the Apigee platform and set up our environment. The three APIs we will build are ATM Location, Branch Location and Product Information.

---

Environment Setup
---

Requirements:
- Apigee Edge
- Node JS
- Text Editor

---

Mocking in Apigee
---

- For this exercise, we would like to connect our API Proxies to a sandbox. This way, we don't have to establish connectivity to any internal services.
- There are a number of different methods of mocking within Apigee.

Assign Message
---

For very simple mocks, we can create an API Proxy within Apigee that does not have a target. Instead of going to a backend we could use one simple AssignMessage policy to create a mock. For example:

```xml 
<AssignMessage name="Assign.ATMMock">
  <AssignTo type="response"/>
  <Set>
  	<Payload contentType="application/json">
	{"atms":[]}
	</Payload>
  </Set>
</AssignMessage>
```

Then use a condition to map API Request Paths to the policies

```xml
<Flow name="Get ATMs">
	<Response>
		<Step>
			<Name>Assign.ATMMock</Name>
		</Step>
	</Response>
	<Condition>proxy.pathsuffix MatchesPath "/atms" and request.verb = "GET"</Condition>
</Flow>
```

This method is very quick to implement, however the complexity grows as we add more resources and error cases.

API Mocker
---

API Mocker is a Node JS Library that can be deployed in Apigee. If we have some example responses, we are able to deploy these with a configuration json file to describe the behaviour we want. 

```json
{
    "mockDirectory": "./responses",
    "quiet": false,
    "port": "8080",
    "logRequestHeaders": false,
    "webServices": {
        "atms": {
            "verbs": ["get"],
            "responses": {
                "get": {"httpStatus": 200, "mockFile": "atms.json"}
            }
        }
    }
}
```

One of the strengths of this framework is the ability to 'switch' responses depending on the request. For example, I could specific a success payload for /customers/123 and an error payload for /customers/999. 

Aside from using these switch statements, this framework does not perform any request validation. 

Swagger Tools
---

It is very likely that we have Swagger files for our APIs. It is possible to leverage these to allow our sandboxes to perform request validation and then return auto-generated responses. Swagger Tools is an example of a framework that allows us this. You can try it online in the API Studio [tool](http://apistudio.io)

By auto-generating sandboxes, we lower the cost of maintenance. You should ensure that (Examples)[https://swagger.io/docs/specification/adding-examples/] are provided in your API Specifications, otherwise you may see dummy data such as `"accountId":"Sample Text"`.

Dynamic Mocks
---

In all of the mocking options proposed so far, static responses have been returned from the sandbox. If you would like dynamic responses, e.g. updating the /balances response after POSTing to /payments, then persistence is required. For this, the Apigee Cache can be leveraged with the Client ID or IP Address forming part of the Cache Key. This way, balance changes can be stored for a short time and only for a given sandbox developer.

Deploying our Sandbox
---

For our Sandbox, we will upload Swagger tools proxies with their corresponding specification.

Trying our Sandbox
---

Protecting our Sandbox
---

An example of a check we may perform as part of our sandbox is a Spike Arrest. This will allow us to limit the amount of traffic from a single consumer.

Bonus: Storing our code
---
While we are here, lets store our code in Git.

