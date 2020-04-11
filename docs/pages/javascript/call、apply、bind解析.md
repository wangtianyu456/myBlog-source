# 实现 `call、apply、bind`

## 实现 `call`

```javascript
function call(context) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(args);
  delete context.fn;
  return result;
}
```

::: tip 区别
`call` 和 `apply` 的区别其实就是传递参数的不同

`call` 的传递参数的方式是`fn.call(this,1,2,3)`，传递给函数的参数是一个一个传递进去的

`apply` 的传递参数的方式是`fn.call(this,[1,2,3]])`，传递给函数的参数是以一个数组或者类数组传递进去的
:::

## 实现 `apply`

```javascript {7}
function call(context) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }
  context = context || window;
  context.fn = this;
  // 传递参数的方式不同
  const args = arguments[1];
  const result = context.fn(args);
  delete context.fn;
  return result;
}
```

## 实现 `bind`

`bind`方法实现起来比较复杂，首先我们先来实现一个基础版的，可以实现修改`this`指向和参数的保存功能，这里利用了函数柯里化的思想

```javascript
function bind(context) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }
  // _this 保存当前的函数
  const _this = this;
  const args = [...arguments].slice(1);
  return function () {
    const finalArgs = [...args, ...arguments];
    return _this.apply(context, finalArgs);
  };
}
```

::: warning 注意
因为`bind`函数执行返回的是一个经过处理了 this 指向的函数，而且此函数还有可能会被进行`new`操作，所以我们还需要对这种情况进行一些特殊处理
:::

返回的函数被当做构造函数的情况下，我们需要注意一些细节问题：

1. 通过 `new` 构造函数生成的实例的 this 应该指向它自己，不应该被之前传入的参数所影响
2. 因为我们要实现继承，所以需要将返回的构造函数的原型也指向 `this.prototype`，但是这样指向的是同一个引用，当我们修改了这个构造函数的原型对象时，也会吧 this.prototype 修改，因此我们为了避免这种情况，所以新建一个空函数来做中转，通过这个空函数来做继承

```javascript
function bind(context) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }
  // _this 保存当前的函数
  const _this = this;
  const args = [...arguments].slice(1);

  // 创建一个空函数来做中转，避免this的原型被返回的构造函数所修改
  const F = function () {};
  F.prototype = this.prototype;

  const bound = function () {
    const finalArgs = [...args, ...arguments];
    // 这里需要考虑一下如果当前函数被当成构造函数来new的时候，实例的this应该就是指向它自己
    return _this.apply(this instanceof F ? this : context, finalArgs);
  };

  // 通过中转函数来实现继承，而不是直接指向
  bound.prototype = new F();
  return bound;
}
```

## 生产环境中使用

如果要在生产环境中使用，不要直接挂载到原型上，而是先判断原型上是否存在该方法，再去选择是否创建该方法

```javascript
Function.prototype.call =
  Function.prototype.call ||
  function call(context) {
    // ...
  };
```
