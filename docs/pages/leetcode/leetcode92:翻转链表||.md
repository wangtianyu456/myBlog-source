# leetcode92:[反转链表||](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

## 题目描述

![leetcode92](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode92_reverseBetween.png)

## 梳理思路

反转的思路和 [leetcode206：反转列表](./leetcode206:翻转链表.md) 其实都是一样的，难点在于，这次是要截取一部分进行反转，而翻转过程中如何将反转链表中起始节点之前和结束节点之后的引用全部保存下来，并在翻转成功后重新修改指向是重点

我们在过程中需要保存几个值

- `sliceStartPrev` 是反转`list`的起始节点的前一个节点，要在反转结束后，让其`next`指向反转后的`list`的`head`
- `sliceStart` 是反转开始的节点
- `sliceEnd` 反转结束的节点
- `sliceEndNext` 是反转结束节点的后一个节点，同样的，我们需要在反转结束后，让反转后的`list`的`tail`节点指向它

问题在于我们如何去做`list`的截取，这里我们利用先将`sliceEnd.next`的节点的引用缓存，然后直接切断`sliceEnd.next`的引用，这样反转`list`的时候，因为没有`next`指向了，所以就会停止反转，最后我们将翻转后的`list`的`tail`的节点，指向之前缓存的`sliceEndNext`即可

- `let sliceEndNext = sliceEnd.next`
- `sliceEnd.next = null`

```javascript
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
const reverseBetween = function (head, m, n) {
  let i = 1
  // 要开始翻转的起始点的前一个node，最后要让它的next指向翻转后的list的head节点
  let sliceStartPrev = null
  // 开始翻转的起始点
  let sliceStart = null
  let sliceEnd = null
  let cur = head

  while (i <= n) {
    // 开始翻转的点的前一个节点
    if (i === m - 1) {
      sliceStartPrev = cur
    }
    // 开始翻转的起始点
    if (i === m) {
      sliceStart = cur
    }
    // 翻转的结束点
    if (i === n) {
      sliceEnd = cur
    }
    cur = cur.next
    i++
  }

  // 翻转的list的终点的后一个节点，需要在翻转结束后，让list的尾结点的next指向这个节点
  // 并且这里将后面节点的引用全部缓存下来
  // 后边将sliceEnd.next直接切断，后边的list在翻转的时候，就会到此结束，然后再将翻转后的list的tail节点指向刚刚缓存的sliceEndNext节点
  let sliceEndNext = sliceEnd.next
  // 为了避免翻转的时候翻转过头，切断终点的next
  sliceEnd.next = null

  const { head: slicedHead, tail: slicedTail } = reverse(sliceStart)

  // 翻转的list部分前面还有节点
  if (sliceStartPrev) {
    sliceStartPrev.next = slicedHead
  } else {
    // 翻转起始部分前边没有节点了，直接将head指向翻转后的 list 的head
    head = slicedHead
  }
  slicedTail.next = sliceEndNext
  return head
}

function reverse(head) {
  let prev = null
  let cur = head
  while (cur) {
    let next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  // 返回翻转后的头尾节点
  return { head: prev, tail: head }
}
```
