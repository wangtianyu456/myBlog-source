# 函数式编程之实现函数柯里化 curry 函数

现在有一个需求，我需要实现一个函数对几个数字进行求和，这个函数需要支持的传参方式为 `fn(1,2,3)` 或者 `fn(1)(2,3)` 或者 `fn(1)(2)(3)`
这种函数就需要实现函数的柯里化来实现对参数的保存，接下来我们就来实现一个通用的 `curry` 函数

通俗的来说就是：**利用 JavaScript 中闭包的特性，实现对参数的保存，然后等参数达到我们需要的数量后再去执行**

```javascript
function curry(fn, args) {
  // fn.length 可以获取到fn中所定义的形参的个数
  // 例如：function sum(a,b,c){}  fn.length = 3
  let length = fn.length;
  args = args || [];
  return function () {
    let finalArgs = [...args, ...arguments];
    // 判断组合后的参数是否满足fn所定义的形参的个数
    if (finalArgs.length < length) {
      // 经过组合后的参数的个数少于fn所定义的形参的个数
      // 这里的this的作用是能够保证在this发生变化的情况下，还能够保存this
      return curry.call(this, fn, finalArgs);
    } else {
      return fn.apply(this, finalArgs);
    }
  };
}

// 测试
function sum(a, b, c) {
  console.log(a + b + c);
}

const fn = curry(sum);
fn(1)(2)(3);
fn(1)(2, 3);
fn(1, 2, 3);

// 对于curry方法实现中，this的情况
// 这里可以保证this不会被错误的判定成window
const foo = curry(function (a, b, c) {
  console.log(a, b, c);
  console.log(this);
});
const obj = {
  a: 1,
  foo,
};
obj.foo(1, 2, 3);
```
