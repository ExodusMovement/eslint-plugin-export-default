module.exports = {
  rules: {
    'last': {
      meta: {
        type: 'suggestion',
        docs: {
          url: '',
        },
        schema: [],
        fixable: true
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
                    const sourceCode = context.getSourceCode();
                    const exportText = sourceCode.getText(node)
                    const lastNode = arr[arr.length - 1]
                    yield fixer.remove(node)
                    yield fixer.insertTextAfter(lastNode, '\n\n' + exportText + '\n');
                  }
                })
              }
            })
          },
        };
      },
    },
    'named': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require default exports to be named',
          category: 'Best Practices',
          recommended: true
        },
        fixable: null
      },
      create: function (context) {
        return {
          ExportDefaultDeclaration: function (node) {
            const declaration = node.declaration;
            if (
                (declaration.type === 'ArrowFunctionExpression' ||
                    declaration.type === 'FunctionExpression') &&
                !hasAssignedName(node)
            ) {
              context.report({
                node,
                message: 'Default exports must be assigned to a named variable.',
              });
            }
            if (
                declaration.type === 'ObjectExpression' &&
                !hasAssignedName(node)
            ) {
              context.report({
                node,
                message: 'Default exports must be assigned to a named variable.',
              });
            }
          }
        };
      }
    }
  }
};

function hasAssignedName(node) {
  const parent = node.parent;
  if (parent.type === 'VariableDeclarator') {
    return parent.id.type === 'Identifier';
  }
  return false;
}

