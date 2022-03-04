# Enhance Your Console

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
