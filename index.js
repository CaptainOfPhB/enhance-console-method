const t = require('@babel/types');
const parser = require('@babel/parser');
const template = require('@babel/template').default;
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

const fs = require('fs');
const sourceCode = fs.readFileSync('./source.js').toString();

const ast = parser.parse(sourceCode, {
  plugins: ['jsx'], sourceType: 'unambiguous',
});

// const targetCalleeNames = ['log', 'debug', 'info', 'warn', 'error'].map(property => 'console.' + property);

traverse(ast, {
  CallExpression(ptah, state) {
    const callee = ptah.node.callee;
    if (callee.type === 'MemberExpression' && callee.object.name === 'console' && ['log', 'error', 'debug', 'info', 'warn'].includes(callee.property.name)) {
      //   if (t.isMemberExpression(callee) && targetCalleeNames.includes(path.get('callee').toString())) {
      const { line, column } = ptah.node.loc.start;
      ptah.node.arguments.unshift(t.stringLiteral(`line ${line}:${column} ->`));
    }
  },
});

// traverse(ast, {
//   CallExpression(path, state) {
//     if (path.node.skip) {
//       return;
//     }
//     const callee = path.node.callee;
//     if (t.isMemberExpression(callee) && targetCalleeNames.includes(path.get('callee').toString())) {
//       const { line, column } = path.node.loc.start;
//       const consoleNode = template.expression(`console.log('line ${line}:${column}')`)();
//       consoleNode.skip = true;
//       if (path.findParent(p => p.isJSXElement())) {
//         path.replaceWith(t.arrayExpression([consoleNode, path.node]));
//         path.skip();
//       } else {
//         path.insertBefore(consoleNode);
//       }
//     }
//   },
// });

const result = generator(ast, { comments: false });

fs.writeFileSync('./build.js', result.code);
