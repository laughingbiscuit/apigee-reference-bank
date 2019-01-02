#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
apigeetool deploySharedflow -u $APIGEE_USER -o $APIGEE_ORG -e $APIGEE_ENV -n "eidas-header" -d "$DIR" -p $APIGEE_PASS
