const fs = require('fs')
const path = require('path')
const { RuleTester } = require('eslint')
const ruleTester = new RuleTester({
  'parserOptions': {
    sourceType: 'module',
    ecmaVersion: 9,
  }
})

const rule = require('../lib/index').rules['last']
const examplesPath = path.resolve(__dirname, 'examples')
const readFile = filePath => fs.readFileSync(filePath, 'utf-8')
const empty = readFile(path.resolve(examplesPath, 'empty.js'))
const valid = readFile(path.resolve(examplesPath, 'valid.js'))
const invalid = readFile(path.resolve(examplesPath, 'invalid.js'))
const invalidFixed = readFile(path.resolve(examplesPath, 'invalid-fixed.js'))
const invalid2 = readFile(path.resolve(examplesPath, 'invalid-2.js'))
const invalid2Fixed = readFile(path.resolve(examplesPath, 'invalid-2-fixed.js'))

ruleTester.run('last', rule, {
  valid: [
    {
      code: empty,
    },
    {
      code: valid,
    }
  ],
  invalid: [{
    code: invalid,
    errors: [{ message: 'Default Export statements should appear at the end of the file' }],
    output: invalidFixed
  }, {
    code: invalid2,
    errors: [{ message: 'Default Export statements should appear at the end of the file' }],
    output: invalid2Fixed
  }]
})