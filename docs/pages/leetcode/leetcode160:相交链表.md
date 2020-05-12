# leetcode160:[相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

## 题目描述

![leetcode160](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode160_getIntersectionNode.png)



## 梳理思路

###双指针法

两个链表有相交的点，即两个链表有相同的尾部，假设叫`commonTail`

- 那么我们定义两个指针`a`指向`headA`的头部，`b`指向`headB`的头部，同时进行遍历

- 当`a`指针走到尾部的时候，让其指向`headB`的头部，同理，让`b`指针走到尾部的时候，让其指向`headA`的头部

- 假设`headA`的链表的长度为`lA`，`headB`的长度为`lB`，那么我们可以得到，`lA - commonTail + lB - commonTail = lB - commonTail + lA - commonTail`

- 这样的结果就是，当`a`走完`headA`的长度后，在继续加上`headB`链表中到`commonTail`之前的长度正好等于`b`走完`headB`的长度，在加上`headA`链表到`commonTail`之前的长度

- 这时两个指针相遇，这就是我们要找的相交的节点



``` javascript
var getIntersectionNode = function (headA, headB) {
  if (headA === null || headB === null) return null
  let a = headA
  let b = headB
  while (true) {
    if (a === b) return a
    // 判断a是否走到headA的最后一个节点了，如果走到最后了，那么继续从headB的头部开始，b同理
    a = a ? a.next : headB
    b = b ? b.next : headA
  }
}
```



::: tip 复杂度分析

- 时间复杂度`O(2n)` -- 当两个链表全部都走完的情况下

- 空间复杂度`O(1)` -- 即两个指针的空间(常数)

:::