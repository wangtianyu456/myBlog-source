# 实现 instanceof

```javascript
/**
 * 实现instanceof
 * @param L 左边的表达式
 * @param R 右边的表达式
 * @return {Boolean}
 * */
function myInstanceof(L, R) {
  // 取 R 的显式原型和 L 的隐式原型
  let o = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === o) {
      // 说明当前 L 在 o 的原型链上
      return true;
    }
    if (L === null) {
      // 证明已经找到最顶层
      return false;
    }
    // 如果没找到,则沿着原型链继续往上找
    L = L.__proto__;
  }
}
```
