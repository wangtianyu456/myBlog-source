# leetcode142:[环形链表||](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

## 题目描述

![leetcode142](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode142_detectCycle.png)

## 梳理思路

### 解法一：遍历打标记

1. 遍历链表中的所有节点，给每个节点打上一个标记
2. 如果这个节点曾经被访问过，就会存在这个标记
3. 所以遍历到链表中的最后一个节点后，它的 next 指向的节点存在这个标记，那么就说明存在环形链表

```javascript
var hasCycle = function (head) {
  while (head) {
    if (head.flag) return true;
    head.flag = true;
    head = head.next;
  }
  return false;
};
```

### 解法二：快慢指针

- 快指针一次走两步，慢指针一次走一步，如果链表存在环，那么就一定会存在相遇的点
- 当两者相遇的时候，我们让快指针回到原点，然后快慢指针都是走一步，那么当它们相遇的时候，这里就是链表的环的入口
- 可以通过画图来辅助理解

![leetcode_142_解析](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode_142_解析.jpeg)

以此图为例，快指针一次走两步，慢指针一次走一步，假设环的入口为 `A`，相遇点为 `B`

![leetcode142_解析2](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode142_解析2.jpeg)

- 假设从`head`开始到入环节点的距离为`n`,从入环节点到相遇节点的距离为`s`，从相遇节点在走回入环节点的距离为`l`
- 因为快指针走的快，所以当快慢指针相遇的时候，快指针走的距离为`n+s+l+s`，慢指针走的距离为`n+s`
- 又因为快指针一次走两步，也就是说，快指针走的距离一直为慢指针的两倍，所以说可以得到`n+s+l+s = 2(n+s)`，最终得出`n=l`
- 此时也就是说，快指针回到`head`，然后一次走一步，和慢指针同步进行，这样走完`n`的距离的时候，两者正好相遇，也就是入环节点

```javascript
const detectCycle = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      fast = head;
      while (fast !== slow) {
        fast = fast.next;
        slow = slow.next;
      }
      return fast;
    }
  }
  return null;
};
```
