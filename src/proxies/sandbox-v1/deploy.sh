DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
apigeetool deployproxy -u $APIGEE_USER -p $APIGEE_PASS -o $APIGEE_ORG -e $APIGEE_ENV -n "" -d $DIR -V
