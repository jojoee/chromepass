#!/usr/bin/env node
const chromepass = require('./../dist/src/chromepass')
const generator = chromepass.default.v1.generator
const args = process.argv.splice(process.execArgv.length + 2)
const n = parseInt(args[0]) || 1

for (let i = 0; i < n; i++) {
  const password = generator()
  console.log(password)
}
