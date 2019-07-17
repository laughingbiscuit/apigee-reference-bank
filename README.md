# Apigee Banking

## Introduction

Around the world, there are a number of different standards for Banking APIs. This repository contains some reference implementations of these.

## Quick Start

- Create apigee-reference-bank KVM with mgmt creds
- Create API Products - "OpenData", "AISP", "PISP"

TODO
- fix company name

```
npm install
npm run deployAll
npm test
```

### Updating the specifications

When updating the specifications provided by the OBIE, ensure you change the 'host' to your Apigee URL + BasePath.

### Portal

If you want to try a local developer portal you can run the Apigee Portal Kickstart in a Docker container. (you must have docker installed)

```
git submodule init
git submodule update
(cd docker-apigee-drupal-kickstart && ./start.sh)
```

Now you can navigate to `https://localhost:8080` and follow the installation instructions. 

When customising your portal, note that you can find the api specifications in the `portal` directory.
