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
    }
  }
};



