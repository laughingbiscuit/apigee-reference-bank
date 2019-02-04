#!/bin/bash

docker build -t myapigee/d8 .
docker run --name some-drupal -p 8080:80 -d \
	-e APIGEE_EDGE_AUTH_TYPE=basic \
	-e APIGEE_EDGE_ENDPOINT=https://api.enterprise.apigee.com/v1 \
	-e APIGEE_EDGE_ORGANIZATION=$APIGEE_ORG \
	-e APIGEE_EDGE_USERNAME=$APIGEE_USER \
	-e APIGEE_EDGE_PASSWORD=$APIGEE_PASS \
	myapigee/d8
