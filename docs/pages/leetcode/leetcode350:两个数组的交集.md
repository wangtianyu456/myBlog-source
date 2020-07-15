# leetcode350:[两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)

## 题目描述

![leetcode350](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode350_intersect.png)

## 梳理思路

### 解法一：哈希表

哈希法：利用哈希表来存储出现过的元素，当第二个数组中的项开始遍历的时候
判断是否出现的次数，如果存在则直接减 1，然后存到 res 数组中

```javascript
const intersect = function (nums1, nums2) {
  const hash = new Map()
  const res = []
  for (let i = 0, len = nums1.length; i < len; i++) {
    if (hash.has(nums1[i])) {
      hash.set(nums1[i], hash.get(nums1[i]) + 1)
    } else {
      hash.set(nums1[i], 1)
    }
  }

  for (let i = 0, len = nums2.length; i < len; i++) {
    const temp = nums2[i]
    const hashKey = hash.get(temp)
    if (hash.has(temp)) {
      res.push(temp)
      // 如果存储的数大于1，则减1
      if (hashKey >= 1) {
        hash.set(temp, hashKey - 1)
      } else {
        hash.delete(temp)
      }
    }
  }
  return res
}
```

### 解法二：如果排序后，那么就用双指针来实现

先排序后利用双指针来同时遍历两个数组

- 如果 nums1[i] < nums2[j] 说明第一个数组的当前项小于了第二个数组的当前项，
- 要去寻找相等的值，所以必须要让 i++
- j 同理

```javascript
const _intersect = function (nums1, nums2) {
  nums1 = nums1.sort((a, b) => a - b)
  nums2 = nums2.sort((a, b) => a - b)
  let i = 0
  let j = 0
  let res = []
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      i++
    } else if (nums1[i] > nums2[j]) {
      j++
    } else {
      res.push(nums1[i])
      i++
      j++
    }
  }
  return res
}
```
