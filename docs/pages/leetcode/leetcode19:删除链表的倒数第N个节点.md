# leetcode19:[删除链表的倒数第 N 个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

## 题目描述

![leetcode19](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode19_removeNthFromEnd.png)

## 梳理思路

### 解法一：直接用栈来记录下链表中的所有的节点

利用栈记录下所有的节点，然后去判断当前节点在栈中的位置

- 如前一位存在而且后一位不存在，那就是最后一位，那么我们直接让前一项的 `next` 指向为 `null` 即可
- 如果前一位不存在，后一位存在，那就是第一位，我们直接删除栈底的项即可
  - 如果此时前一位不存在，且后一位也不存在，那就说明该链表只有一个节点，我们直接让栈底的元素为 `null` 即可
- 如果不是特殊情况，那么我们只需要让前一项的 `next` 指向后一位即可
- 最终返回的时候返回 `stack[0]` 即可

```javascript
const removeNthFromEnd = function (head, n) {
  const stack = [];
  while (head) {
    stack.push(head);
    head = head.next;
  }
  // 要删除项在栈中的位置(索引)
  const cur = stack.length - n;
  // 如果前一项存在
  if (stack[cur - 1]) {
    const prev = stack[cur - 1];
    // 判断后一项是否存在
    if (stack[cur + 1]) {
      prev.next = stack[cur + 1];
    } else {
      prev.next = null;
    }
  } else {
    // 如果前一项不存在，那么说明就是删除的第一项
    if (stack[cur + 1]) {
      // 如果删除的第一项后边还有其他项，那么直接把栈底的元素删除掉
      stack.shift();
    } else {
      stack[0] = null;
    }
  }
  return stack[0];
};
```

::: tip 复杂度分析

- 时间复杂度`O(n)`，遍历链表所有项
- 空间复杂度`O(n)`，栈的空间

:::

### 解法二：快慢指针

- 创建一个快指针和慢指针，快指针先比慢指针走`n`步
- 然后两个指针同步进行，当快指针指向链表中的最后一个节点时，也就是`fast.next === null`的时候，这时的慢指针正好指向了要删除的节点的前一位
- 此时我们直接修改慢指针`next`的指向为`next.next`即删除了倒数第`n`个节点
- 为了避免出现倒数第`n`项正好是第一个链表的情况，我们在链表前边加了一个辅助用的节点`0`，并让它的`next`指向`head`即可，最终返回的时候返回它的`next`

```javascript
const removeNthFromEnd = function (head, n) {
  const preHead = new ListNode(0);
  preHead.next = head;
  let fast = preHead;
  let slow = preHead;
  // 快指针先走 n 步
  n = n + 1;
  while (n--) {
    fast = fast.next;
    console.log(fast);
  }
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return preHead.next;
};
```

::: tip 复杂度分析

- 时间复杂度`O(n)`，遍历链表所有项
- 空间复杂度`O(1)`，指针占用

:::
