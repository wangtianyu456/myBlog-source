# leetcode28:[实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/)

## 题目描述

![leetcode28](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode28_strStr.png)

## 梳理思路

解法：遍历源字符串，然后在遍历源字符串的过程中，遍历目标字符串

- 每次遍历都拿当前字符开头的字符串去和目标字符串去做比较
- 如果遇到不相同的字符，就直接跳出
- 当循环结束或者跳出循环时，判断当前的 j 的长度是否是目标字符串的长度，如果相等，则证明遍历完了，这时就说明此时的`i`索引开头的字符串正好是包含我们的目标字符串

```javascript
const strStr = function (haystack, needle) {
  if (needle.length === 0) {
    return 0
  }
  let i
  let j
  // 这里的边界，就是长度差，最小为1
  // 这里能保证把`haystack`都走完
  for (i = 0; i < haystack.length - needle.length + 1; i++) {
    // 当全部循环完的时候，则说明j的长度正好是目标字符串的长度，此时的`i`的索引就是我们要的
    for (j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        break
      }
    }
    if (j === needle.length) {
      return i
    }
  }
  return -1
}
```
