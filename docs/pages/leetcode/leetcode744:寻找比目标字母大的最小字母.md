# leetcode744:[寻找比目标字母大的最小字母](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/)

## 题目描述

![leetcode744](https://blog-1256985533.cos.ap-nanjing.myqcloud.com/img/leetcode744_nextGreatestLetter.png)

## 梳理思路

### 解法：二分查找

```javascript
/**
 * 解法：二分查找
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
const nextGreatestLetter = function (letters, target) {
  const max = letters.length
  // 边界处理，如果列表中的最后一位都小于目标值，列表中的字母又是循环出现的，所以返回列表中的第一项即可
  // 如 ['a','b'] target='z' 那么就直接返回 'a' 即可
  if (letters[max - 1] <= target) {
    return letters[0]
  }
  const last = binarySearch(letters, 0, max - 1, target)
  return last
}

/**
 * 二分查找法
 * @param {String[]} array
 * @param {Number} first
 * @param {Number} last
 * @param {String} target
 */
function binarySearch(array, first, last, target) {
  // 只要 头指针小于尾指针，那就说明还在区间内
  while (first < last) {
    // 取中位数
    const mid = Math.floor(first + (last - first) / 2)
    if (target < array[mid]) {
      // 如果target小于中位数，那就把尾指针设为中位数，区间缩小为从头到中间
      last = mid
    } else {
      // 否则，将头指针指向中位数的后一位，区间为中间到最后
      first = mid + 1
    }
  }
  return last
}
```
