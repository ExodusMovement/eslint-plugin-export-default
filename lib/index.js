module.exports = {
  rules: {
    'last': {
      meta: {
        type: 'suggestion',
        docs: {
          url: '',
        },
        schema: [],
      },
    
      create(context) {
        return {
          Program({ body }) {
            body.some((node, index, arr) => {
              if (node?.type === 'ExportDefaultDeclaration' && index !== arr.length - 1) {
                context.report({
                  node,
                  message: 'Default Export statements should appear at the end of the file',
                })
              }
            })
          },
        };
      },
    }
  }
};



