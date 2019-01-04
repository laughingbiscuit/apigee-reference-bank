#!/bin/bash

# Generate Open Banking Public APIs Sandbox
./banktool.js clean
./banktool.js generate-sandbox -n atms-sandbox-v1 -s ./specs/atms.json -b /atm-sandbox
./banktool.js generate-sandbox -n ais-sandbox-v1 -s ./specs/ais.json -b /ais-sandbox
./banktool.js generate-sandbox -n bca-sandbox-v1 -s ./specs/bca.json -b /bca-sandbox
./banktool.js generate-sandbox -n branch-sandbox-v1 -s ./specs/branch.json -b /branch-sandbox
./banktool.js generate-sandbox -n callback-sandbox-v1 -s ./specs/callback.json -b /callback-sandbox
./banktool.js generate-sandbox -n ccc-sandbox-v1 -s ./specs/ccc.json -b /ccc-sandbox
./banktool.js generate-sandbox -n funds-sandbox-v1 -s ./specs/funds.json -b /funds-sandbox
./banktool.js generate-sandbox -n pca-sandbox-v1 -s ./specs/pca.json -b /pca-sandbox
./banktool.js generate-sandbox -n pis-sandbox-v1 -s ./specs/pis.json -b /pis-sandbox
./banktool.js generate-sandbox -n sme-sandbox-v1 -s ./specs/sme.json -b /sme-sandbox

#client creds
./banktool.js generate-proxy -n identity-v1 -b /identity/v1
./banktool.js generate-shared-flow -n client-oauth -d ./src/sharedflows/client-credentials
./banktool.js attach-shared-flow -a identity-v1 -f PreFlow -d Request -s client-oauth -n client-oauth

#auth code
./banktool.js generate-shared-flow -n auth-code -d ./src/sharedflows/auth-code
./banktool.js attach-shared-flow -a identity-v1 -f PreFlow -d Request -s auth-code -n auth-code

#add token validation to AIS/PIS
./banktool.js generate-shared-flow -n token-validate -d ./src/sharedflows/token-validate
./banktool.js attach-shared-flow -a sandboxes/ais-sandbox-v1 -f PreFlow -d Request -s token-validate -n token-validate
./banktool.js attach-shared-flow -a sandboxes/pis-sandbox-v1 -f PreFlow -d Request -s token-validate -n token-validate

# add eidas validation to AIS/PIS
./banktool.js generate-shared-flow -n eidas-header -d ./src/sharedflows/eidas-header
./banktool.js attach-shared-flow -a sandboxes/ais-sandbox-v1 -f PreFlow -d Request -s eidas-header -n eidas-header

# dynamic registration
./banktool.js generate-sandbox -n client-registration-v1 -s ./specs/client-registration.json -b /registration-sandbox

## TODO SYNC CLIENTS

# apigee app creation

