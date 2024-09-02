import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

function hasAssignedName({ parent }) {
  return parent.type === 'VariableDeclarator' ? parent.id.type === 'Identifier' : false
}

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  rules: {
    last: {
      meta: {
        type: 'suggestion',
        docs: {
          url: '',
        },
        schema: [],
        fixable: true,
      },

      create(context) {
        return {
          Program({ body }) {
            body.some((node, index, arr) => {
              if (node?.type === 'ExportDefaultDeclaration' && index !== arr.length - 1) {
                context.report({
                  node,
                  message: 'Default Export statements should appear at the end of the file',
                  *fix(fixer) {
                    const sourceCode = context.getSourceCode()
                    const exportText = sourceCode.getText(node)
                    const lastNode = arr[arr.length - 1]
                    yield fixer.remove(node)
                    yield fixer.insertTextAfter(lastNode, '\n\n' + exportText + '\n')
                  },
                })
              }
            })
          },
        }
      },
    },
    named: {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require default exports to be named',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: null,
      },
      create: function (context) {
        return {
          ExportDefaultDeclaration: function (node) {
            const declaration = node.declaration
            if (
              (declaration.type === 'ArrowFunctionExpression' || declaration.type === 'FunctionExpression') &&
              !hasAssignedName(node)
            ) {
              context.report({
                node,
                message: 'Default exports must be assigned to a named variable.',
              })
            }
            if (declaration.type === 'ObjectExpression' && !hasAssignedName(node)) {
              context.report({
                node,
                message: 'Default exports must be assigned to a named variable.',
              })
            }
          },
        }
      },
    },
  },
}

export default plugin
