# leetcode844:[比较含退格的字符串](https://leetcode-cn.com/problems/backspace-string-compare/)

## 题目描述

![leetcode844](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode844_backspaceCompare.png)

## 梳理思路

### 解法一：利用栈

向栈中一个一个字符的压入，遇到`#`就将栈中的最后一位删除

::: tips

> 时间复杂度 O(M+N) M 是字符传 S 的长度，N 是字符串 T 的长度
> 空间复杂度 O(M+N)

:::

```javascript
const backspaceCompare = function (S, T) {
  function buildStr(str) {
    const stack = []
    const len = str.length
    for (let i = 0; i < len; i++) {
      let char = str[i]
      if (char === '#') {
        // 如果是空，那么就什么都不做
        // 如果栈中已经有值了，那么就直接删除当前的最后一项
        if (stack.length !== 0) {
          stack.pop()
        }
      } else {
        stack.push(char)
      }
    }
    return stack.join('')
  }
  return buildStr(S) === buildStr(T)
}
```
