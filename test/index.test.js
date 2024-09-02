import fs  from 'fs'
import path  from 'path'
import { RuleTester } from 'eslint'
import plugin from '../lib/index.js'

const ruleTester = new RuleTester({
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 9,
  },
})

const readFile = filePath => fs.readFileSync(filePath, 'utf-8')

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const testLastRule = () => {
  const examplesPath = path.resolve(__dirname, 'examples')
  const empty = readFile(path.resolve(examplesPath, 'empty.js'))
  const valid = readFile(path.resolve(examplesPath, 'valid.js'))
  const invalid = readFile(path.resolve(examplesPath, 'invalid.js'))
  const invalidFixed = readFile(path.resolve(examplesPath, 'invalid-fixed.js'))
  const invalid2 = readFile(path.resolve(examplesPath, 'invalid-2.js'))
  const invalid2Fixed = readFile(path.resolve(examplesPath, 'invalid-2-fixed.js'))
  const rule = plugin.rules['last']

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
}

const testNamedRule = () => {
  const namedRuleExamples = path.resolve(__dirname, 'examples', 'named')
  const empty = readFile(path.resolve(namedRuleExamples, 'empty.js'))
  const invalidConst = readFile(path.resolve(namedRuleExamples, 'invalid-constant.js'))
  const invalidFunc = readFile(path.resolve(namedRuleExamples, 'invalid-function.js'))
  const validConst = readFile(path.resolve(namedRuleExamples, 'valid-constant.js'))
  const validFunc = readFile(path.resolve(namedRuleExamples, 'valid-function.js'))
  const rule = plugin.rules['named']

  ruleTester.run('named', rule, {
    valid: [
      {
        code: empty,
      },
      {
        code: validConst,
      },
      {
        code: validFunc,
      }
    ],
    invalid: [{
      code: invalidFunc,
      errors: [{ message: 'Default exports must be assigned to a named variable.' }],
    }, {
      code: invalidConst,
      errors: [{ message: 'Default exports must be assigned to a named variable.' }],
    }]
  })
}

testNamedRule()
testLastRule()
