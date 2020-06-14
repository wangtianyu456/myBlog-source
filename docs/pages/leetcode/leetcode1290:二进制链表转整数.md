# leetcode1290:[二进制链表转整数](https://leetcode-cn.com/problems/convert-binary-number-in-a-linked-list-to-integer/)

## 题目描述

![leetcode1290](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode1290_getDecimalValue.png)

## 梳理思路

### 解法一：直接迭代链表，然后将值存储为一个字符串，利用`parseInt()`这个 API 来解决

```javascript
const getDecimalValue = function (head) {
  if (!head) {
    return 0
  }
  let binary = ''
  while (head) {
    binary += head.val
    head = head.next
  }
  return parseInt(binary, 2)
}
```

::: tip 复杂度分析

- 时间复杂度为`O(n)`
- 空间复杂度为`O(n)`

:::
