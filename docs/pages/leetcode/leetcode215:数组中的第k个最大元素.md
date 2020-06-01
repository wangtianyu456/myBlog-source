# leetcode215:[数组中的第 k 个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

## 题目描述

![leetcode215](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode215_findKthLargest.png)

## 梳理思路

### 解法一：全倒序排序，然后取第`k`项，即索引为`k-1`的项

```javascript
const findKthLargest = function (nums, k) {
  return nums.sort((a, b) => b - a)[k - 1];
};
```

### 解法二：借助冒泡排序的思想

```javascript
const _findKthLargest = function (nums, k) {
  const len = nums.length - 1;
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < len - i; j++) {
      if (nums[j] > nums[j + 1]) {
        const temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
  }
  return nums[nums.length - k];
};
```
