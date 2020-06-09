# leetcode239:[两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

## 题目描述

![leetcode239](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode239_maxSlidingWindow.png)

## 梳理思路

### 解法一：暴力循环法

`arr` 来作为滑动窗口，循环数组向滑动窗口里边添加

```javascript
var maxSlidingWindow = function (nums, k) {
  if (k === 1) return nums
  const max = []
  const arr = []
  for (let i = 0; i < nums.length; i++) {
    arr.push(nums[i])
    if (i >= k - 1) {
      max.push(Math.max(...arr))
      arr.shift()
    }
  }
  return max
}
```

### 解法二：利用双端队列

- 我们维护一个双端队列`deque`，在作为滑动窗口，用这个队列来存储数组索引，让这个队列中存储的队头一直是最大值
- 我们在刚开始的时候，先把第一项的索引存入队列中，然后后面来的项都会和当前队列中末尾的项(即最小值的索引)，来比较大小
- 如果当前项大于队列末尾的项，我们就把末尾的项给移除队列，直到这个队列中不存在比当前项更大的项为止
- 也就是说队列中一直维持这从大到小的排列，第一项永远是当前循环的最大项
- 当循环的次数已经大于等于`k-1`的时候，我们后续的每次循环都要选出当前队列(滑动窗口)的最大值
- 如果队列中的项的个数大于等于`k`的时候，我们每次在添加之前都要删除掉队列中的第一项

```javascript
var maxSlidingWindow = function (nums, k) {
  const deque = []
  const result = []
  for (let i = 0; i < nums.length; i++) {
    // 当滑动窗口的大小超出限制的时候，删除队列头部
    if (i - deque[0] >= k) {
      deque.shift()
    }
    // 只要遇到比当前队列末尾的值大的值就把队列末尾的值删除，直到队列中不再存在比当前值更大的值，在把当前最大的值添加进去
    // 如果遇到的比队列末尾更小的值，那么就直接放入队列末尾
    // 使得队列始终维持在递减的顺序，队头是最大值，队尾是最小值
    while (nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop()
    }
    deque.push(i)
    // 当i大于等于k-1的时候，也就是当滑动窗口的项满足k的大小的时候，每次在添加完项之后，都会把当前队列中的最大值取出来
    if (i >= k - 1) {
      result.push(nums[deque[0]])
    }
  }
  return result
}
```
