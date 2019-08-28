#!/usr/bin/env node

const fs = require('fs')

fs.readdir('./third_party/openbanking.org.uk/', (err, files) => {
  files.forEach(file => {
    const dir = file.replace('.json', '')
    fs.copyFile('./third_party/openbanking.org.uk/' + file,
      './apiproxies/' + dir + '/apiproxy/resources/hosted/swagger.json', e => {
        console.log(!e ? 'Success: ' + dir : e)
      })
  })
})
