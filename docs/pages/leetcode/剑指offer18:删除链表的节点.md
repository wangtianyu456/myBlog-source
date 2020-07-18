# 剑指 Offer 18:[删除链表的节点](https://leetcode-cn.com/problems/remove-duplicate-node-lcci/)

## 题目描述

![剑指 Offer 18](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/剑指offer18_deleteNode.png)

## 梳理思路

### 解法：双指针加傀儡节点

双指针：利用双指针和傀儡节点来实现，遇到值相等的情况就让`pre.next = cur.next`

```javascript
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
const deleteNode = function (head, val) {
  const preHead = new ListNode(0)
  preHead.next = head
  let pre = preHead
  let cur = preHead.next
  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next
    } else {
      pre = pre.next
    }
    cur = cur.next
  }
  return preHead.next
}
```
