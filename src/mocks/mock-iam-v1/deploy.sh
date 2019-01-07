#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
npx apigeetool deployhostedtarget -u $APIGEE_USER -p $APIGEE_PASS -o $APIGEE_ORG -e $APIGEE_ENV -n "mock-iam-v1" -d $DIR -V -b /mock-iam/v1

