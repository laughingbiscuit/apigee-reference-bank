Feature: 
    As a Third Party API Developer
    I want to use Banking APIs
    So that I can build an app

    Scenario: I successfully obtain a client credentials access token
        Given I have basic authentication credentials XAsT7MGz9GoGPvpp8UqjnTw0JIcIekUA and CCFG3f0OavXoA1we
        And I set Content-Type header to application/x-www-form-urlencoded
        And I set body to grant_type=client_credentials&client_id=XAsT7MGz9GoGPvpp8UqjnTw0JIcIekUA
        When I POST to /identity/v1/token
        Then response code should be 200
        And response body path $.access_token should be (.*)

    Scenario: I am unauthorized to obtain a client credentials access token
        Given I have basic authentication credentials something and wrong
        And I set Content-Type header to application/x-www-form-urlencoded
        And I set body to grant_type=client_credentials
        When I POST to /identity/v1/token
        Then response code should be 401
    
    Scenario: I am missing a grant_type to obtain a client credentials access token
        Given I have basic authentication credentials XAsT7MGz9GoGPvpp8UqjnTw0JIcIekUA and CCFG3f0OavXoA1we
        When I POST to /identity/v1/token
        Then response code should be 400

