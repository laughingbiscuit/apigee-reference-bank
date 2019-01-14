Apigee Reference Bank
---

> under active development

This repository contains a guide to implementing Open Banking APIs using Apigee. In addition it contains a tool that automates this process, generating a reference implementation containing Open Data, Identity, Account Information and Payment Initiation API Sandboxes, Proxies and Developer Portal Content.


## Quick Start Guide

* Install Git, Node JS
* Get the code
``` bash
git clone https://github.com/laughingbiscuit/apigee-reference-bank
```
* install the dependencies
``` bash
cd apigee-reference bank
npm install
```
* look around the project - its looks scarier than it is!
```bash
# workshops - which have lots of valuable info
cd content

# specs - collection of Open API Specifications (OBIE)
cd specs

# build scripts to build a full OBIE or Berlin Group reference
cd src/build

# custom java for eIDAS certificate parser - here be dragons
cd src/java

# mock Identity Provider to demonstrate external OAuth token usage
cd src/mocks

# Drupal 8 Dev Portal code, Dockerize for your pleasure
cd src/portal

# A sandbox template which we will use for stubbed backends
cd src/proxies/sandbox-v1

# An API Proxy template which we will use for our real APIs
cd src/proxies/template-api-v1

# Reusable flows for API logic like Dynamic Registration, Traffic Management and Token Validation
cd src/sharedflows
```
* build the reference implementation
```bash
npm run obie
```
* note that a `target/` directory has been created
* set your credentials
```bash
export APIGEE_USER=xxx
export APIGEE_PASS=xxx
export APIGEE_ORG=xxx
export APIGEE_ENV=xxx
```
* deploy the shared flows
```bash
cd target/shared/*
./deploy.sh
```
* deploy the rest of the proxies!
```bash
cd target/**
./deploy.sh
```
* deploy the dev portal (work in progress)
```bash
cd src/portal
./start.sh && ./initialSetup.sh
```
* You've done it! Better run some tests to make sure...
```bash
npm test
```
* If you got this far, you have earnt a coffee. Enjoy!

