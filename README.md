# Apigee Banking

## User Guide

[![Docs](./docs-src/docs.png)](https://laughingbiscuit.github.io/apigee-reference-bank)

__[Read the User Guide](https://laughingbiscuit.github.io/apigee-reference-bank)__

## User Guide Development

All documentation should be managed in the `docs-src` folder. Codelabs is used to generate the User Guide and plantuml for sequence diagrams. Install them as below.

```
# Install claat
go get github.com/googlecodelabs/tools/claat

# Install plantuml
apt-get install -y plantuml

# Alternatively, you can download the plantuml jar file
```

You can then use the following commands to generate and serve the docs locally.

```
npm run generateDocs
npm run serveDocs
```
