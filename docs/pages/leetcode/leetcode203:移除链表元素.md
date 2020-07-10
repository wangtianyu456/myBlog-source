# leetcode203:[移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

## 题目描述

![leetcode203](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode203_removeElements.png)

## 梳理思路

### 解法一：利用辅助节点

先建立一个空节点，然后开始循环，判断`next`节点的`val`与当前的`val`是否相等
如果相等，则让当前节点的 next 指向 next.next 即可

```javascript
const removeElements = function (head, val) {
  let root = new ListNode()
  root.next = head
  let cur = root
  while (cur) {
    let next = cur.next
    if (!next) {
      break
    }
    let nextVal = next.val
    if (nextVal === val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return root.next
}
```
