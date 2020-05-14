# leetcode876:[链表的中间节点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

## 题目描述

![leetcode876](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode876_middleNode.png)

## 梳理思路

### 解法一：利用栈结构

```javascript
const middleNode = function (head) {
  const stack = [];
  while (head) {
    stack.push(head);
    head = head.next;
  }
  return stack[Math.floor(stack.length / 2)];
};
```

::: tip 复杂度分析

- 时间复杂度为`O(n)`
- 空间复杂度为`O(n)`

:::

### 解法二：利用快慢指针

让 `fast` 一次走两步，`slow` 一次走一步，那么当 `fast` 到达链表的末尾时，`slow` 必然位于中间。

```javascript
const middleNode = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};
```
