const types = require('@babel/types');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const fs = require('fs');
const sourceCode = fs.readFileSync('./sourceCode.js').toString();

const ast = parser.parse(sourceCode, {
  plugins: ['jsx'],
  sourceType: 'unambiguous',
});

traverse(ast, {
  CallExpression(point) {
    console.log(point);
    return undefined;
  }
})

console.log(ast);