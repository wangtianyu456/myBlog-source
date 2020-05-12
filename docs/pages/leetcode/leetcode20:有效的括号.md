# leetcode20:[有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

## 题目描述

![leetcode20](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode20_isValid.png)

## 梳理思路

利用栈结构来辅助解题，我们循环往栈中压入各个字符串，

- 只有在字符串是`'('` `'{'` `'['`括号的左半部分才压入栈中
- 如果匹配到的是`')'` `'}'` `']'`括号的右半部分,那么就要取出当前栈中栈顶的元素去和当前的元素去做匹配，如果匹配成功，那么就把栈中栈顶的元素弹出，否则跳出循环
- 只要最终返回的栈的长度不为 0，那么就说明，这个字符串不符合有效的括号的规则

```javascript
const isValid = function (s) {
  // {()}
  const map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(s[i]);
    } else if (s[i] !== map[stack.pop()]) {
      return false;
    }
  }
  return stack.length === 0;
};
```
