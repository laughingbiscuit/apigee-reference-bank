Feature: 
    As a Third Party API Developer
    I want to use Banking APIs
    So that I can build an app

    Scenario Outline: I successfully use the Open Data sandbox
       When I GET <resource>
       Then response code should be 200
       And response body should be valid json
       Examples:
        | resource                                      |
        | /atm-sandbox/open-banking/v2.2/atms           |

