# Enhance Console Method

Use `babel` to insert extra row position information into the console method.

```js
// before
function fn() {
  console.log(123);
}

// after
function fn(){
  console.log('line 2:2');
  console.log(123)
}
```

## Guidance

1. Install dependency.

```bash
pnpm install
```

2. Build target code to `build.js` file.

```bash
pnpm start
```
