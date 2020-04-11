# new

实现 new

```javascript
function create() {
  // 先创建一个空对象
  let obj = {};
  // 取出构造函数
  let Constructor = [...arguments].shift();
  // 重点：让创建的对象的__proto__(隐式原型)指向构造函数的prototype(原型)
  obj.__proto__ = Constructor.prototype;
  // 判断当前构造函数执行时候会返回引用类型
  // 如果是引用类型，就直接返回，如果不是引用类型，就将新创建的对象返回，也就是新的实例
  let result = Constructor.apply(obj, arguments);
  return typeof result === "object" ? result : obj;
}
```
