# leetcode83:[删除排序列表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

## 题目描述

![leetcode83](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode83_deleteDuplicates.png)

## 梳理思路

### 解法：只需要迭代这个链表，因为链表是是已经排好序的，所以只要判断当前节点与下一个节点的`val`是否相等，如果相等

```javascript
const deleteDuplicates = function (head) {
  if (!head || !head.next) {
    return head
  }
  let currentHead = head
  while (currentHead && currentHead.next) {
    if (currentHead.val === currentHead.next.val) {
      currentHead.next = currentHead.next.next
    } else {
      currentHead = currentHead.next
    }
  }
  return head
}
```
