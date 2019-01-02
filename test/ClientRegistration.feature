@Debug
Feature:
    As an API Developer
    I want to register clients
    So that I can identify, authenticate and authorize them during API calls

    Scenario:
       Given I set body to abc
       And I set Content-Type header to application/jwt
       When I POST to /registration-sandbox/register
       Then response code should be 201
