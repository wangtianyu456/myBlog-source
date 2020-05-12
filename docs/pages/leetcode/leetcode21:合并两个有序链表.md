# leetcode21:[合并两个有序链表](https://leetcode-cn.com/problems/lru-cache/)

## 题目描述

![leetcode21](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode21_mergeTowLists.png)

## 梳理思路

`ListNode`是一个单向链表节点，这个链表是有序的，说明最开始都是各自的最小值，因此我们从链表的第一项开始进行节点大小的比较，如果`l1`的第一个节点小于`l2`的第一个节点，那么返回的链表就是从`l1`上开始的，反之则是`l2`
判断`l1.val < l2.val`如果成立，就说明 `l1` 的最小项还小于 `l2` 的最小项，所以需要递归判断 `l1.next` 和 `l2` 的当前节点的大小，并且因为当前已经是最小值了，所以要让 l1.next 指向后续的结果。同理，反过来也是一样的
而递归的跳出条件是 `l1 === null` 就是说之前`l1.next`后边已经没有下一个节点了，所以直接把当前 `l1.next` 后续的节点直接指向当前的 `l2` 即可

```javascript
function ListNode(val) {
  this.val = val;
  this.next = null;
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * */
const mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```
