#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
npx apigeetool deployhostedtarget -u davissean@google.com -o emea-poc9 -e test -n "mock-ob-iam" -d . -b /mock-iam/v2 -V
