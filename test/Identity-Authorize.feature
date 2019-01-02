Feature: 
    As a Third Party API Developer
    I want to use Banking APIs
    So that I can build an app

    Scenario: I successfully obtain a login page
        Given I set query parameters to 
        | parameter     | value                                 |
        | client_id     | XAsT7MGz9GoGPvpp8UqjnTw0JIcIekUA      |
        | response_type | code                                  |
        | redirect_uri  | https://httpbin.org/get               |
        | scope         | accounts                              |
        | state         | 1234                                  |
        When I GET /mock-iam/v2/authorize
        Then response code should be 200

    Scenario: I successfully consent
        Given I set Content-Type header to application/x-www-form-urlencoded
        And I set body to consent=true&accountNo=11111111
        When I POST to /mock-iam/v2/consent
        Then response code should be 302
        And response header Location should be (.*)code=(.*)

    Scenario: I successfully exchange a code for an access token
        Given I have basic authentication credentials XAsT7MGz9GoGPvpp8UqjnTw0JIcIekUA and CCFG3f0OavXoA1we
        And I set Content-Type header to application/x-www-form-urlencoded
        And I set body to grant_type=authorization_code&code=`unique`&client_id=XAsT7MGz9GoGPvpp8UqjnTw0JIcIekUA&redirect_uri=https://httpbin.org/get
        When I POST to /identity/v1/token
        Then response code should be 200
        And response body path $.access_token should be (.+)
        And I store the value of body path $.access_token as access token
        
    Scenario: I successfully make an Account Information Request with a token
        Given I set bearer token
        And I set x-fapi-financial-id header to 123
        When I GET /ais-sandbox/open-banking/v3.0/aisp/accounts
        Then response code should be 200
    
    Scenario: I fail to make an Account Information Request with a token
        When I GET /ais-sandbox/open-banking/v3.0/aisp/accounts
        Then response code should be 401
